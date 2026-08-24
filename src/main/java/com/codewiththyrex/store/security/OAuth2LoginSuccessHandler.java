package com.codewiththyrex.store.security;

import com.codewiththyrex.store.entity.AuthProvider;
import com.codewiththyrex.store.entity.Role;
import com.codewiththyrex.store.entity.User;
import com.codewiththyrex.store.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final AuthCookieService authCookieService;

    public OAuth2LoginSuccessHandler(JWTService jwtService, UserRepository userRepository, AuthCookieService authCookieService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.authCookieService = authCookieService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String googleId = oAuth2User.getAttribute("sub"); // Google's stable unique user ID
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        User user = userRepository.findByGoogleId(googleId)
                .orElseGet(() -> userRepository.findByEmail(email)
                        .map(existingUser -> {
                            // Local account exists with this email — link Google to it
                            existingUser.setGoogleId(googleId);
                            existingUser.setAuthProvider(AuthProvider.BOTH);
                            return existingUser;
                        })
                        .orElseGet(() -> {
                            // Brand-new user via Google
                            User newUser = new User();
                            newUser.setEmail(email);
                            newUser.setGoogleId(googleId);
                            newUser.setFirstName(firstName);
                            newUser.setLastName(lastName);
                            newUser.setAuthProvider(AuthProvider.GOOGLE);
                            newUser.setEmailVerified(true); // Google already verified it
                            return newUser;
                        })
                );

        user = userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());
        response.addHeader("Set-Cookie", authCookieService.createJwtCookie(token).toString());
        String frontendPath = user.getRole() == Role.ADMIN ? "/admin" : "/";
        response.sendRedirect("http://localhost:5173" + frontendPath);
    }
}
