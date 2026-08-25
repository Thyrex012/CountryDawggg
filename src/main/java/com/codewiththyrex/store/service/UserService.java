package com.codewiththyrex.store.service;

import com.codewiththyrex.store.entity.AuthProvider;
import com.codewiththyrex.store.entity.User;
import com.codewiththyrex.store.repository.UserRepository;
import com.codewiththyrex.store.security.JWTService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerLocalUser(String email, String rawPassword, String firstName, String lastName, String phoneNumber) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account with this email already exists");
        }
        User user = buildLocalUser(email, rawPassword, firstName, lastName, phoneNumber);
        return userRepository.save(user);
    }

    private User buildLocalUser(String email, String rawPassword, String firstName, String lastName, String phoneNumber) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setAuthProvider(AuthProvider.LOCAL);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phoneNumber);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with the following email doesn't exist"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
