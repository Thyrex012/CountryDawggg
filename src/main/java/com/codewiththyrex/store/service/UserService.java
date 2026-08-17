package com.codewiththyrex.store.service;

import com.codewiththyrex.store.entity.AuthProvider;
import com.codewiththyrex.store.entity.User;
import com.codewiththyrex.store.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User handleGoogleLogin(String googleId, String email, String firstName, String lastName){
        // First: has this Google account logged in before
        Optional<User> byGoogleId = userRepository.findByGoogleId(googleId);
        if (byGoogleId.isPresent()) {
            return byGoogleId.get();
        }

        //Second: Link Google account to local account
        Optional<User> byEmail = userRepository.findByEmail(email);
        if (byEmail.isPresent()){
            User existing = byEmail.get();
            existing.setGoogleId(googleId);
            existing.setAuthProvider(AuthProvider.BOTH);
            existing.setEmailVerified(true); // Google verified it, trust it now
            return userRepository.save(existing);
        }

        //Third: brand-new user signing up via Google for the first time
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setGoogleId(googleId);
        newUser.setAuthProvider(AuthProvider.GOOGLE);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmailVerified(true);
        return userRepository.save(newUser);
    }

    public User registerLocalUser(String email, String rawPassword, String firstName, String lastName) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account with this email already exists");
        }
        User user = buildLocalUser(email, rawPassword, firstName, lastName);
        return userRepository.save(user);
    }

    public User loginLocalUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (user.getPasswordHash() == null || !passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    private User buildLocalUser(String email, String rawPassword, String firstName, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setAuthProvider(AuthProvider.LOCAL);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        return user;
    }
}
