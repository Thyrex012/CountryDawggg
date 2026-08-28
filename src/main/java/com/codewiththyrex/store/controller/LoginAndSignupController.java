package com.codewiththyrex.store.controller;

import com.codewiththyrex.store.dto.AuthResponse;
import com.codewiththyrex.store.dto.LoginRequest;
import com.codewiththyrex.store.dto.RegisterRequest;
import com.codewiththyrex.store.entity.User;
import com.codewiththyrex.store.security.JWTService;
import com.codewiththyrex.store.security.AuthCookieService;
import com.codewiththyrex.store.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class LoginAndSignupController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final AuthCookieService authCookieService;

    public LoginAndSignupController(UserService userService, AuthenticationManager authenticationManager, JWTService jwtService,
                                    AuthCookieService authCookieService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.authCookieService = authCookieService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerLocalUser(
                request.email(),
                request.password(),
                request.firstName(),
                request.lastName(),
                request.phoneNumber()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        User user = (User) userService.loadUserByUsername(request.email());
        String jwtToken = jwtService.generateToken(request.email());

        AuthResponse response = new AuthResponse(
                user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole().name());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authCookieService.createJwtCookie(jwtToken).toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, authCookieService.clearJwtCookie().toString())
                .build();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
