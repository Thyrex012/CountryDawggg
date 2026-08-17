package com.codewiththyrex.store.controller;

import com.codewiththyrex.store.entity.User;
import com.codewiththyrex.store.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerLocalUser(
                request.email(),
                request.password(),
                request.firstName(),
                request.lastName()
        );
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.loginLocalUser(request.email(), request.password());
    }

    // POST /api/auth/google
    @PostMapping("/google")
    public User googleLogin(@RequestBody GoogleLoginRequest request) {
        return userService.handleGoogleLogin(
                request.googleId(),
                request.email(),
                request.firstName(),
                request.lastName()
        );
    }

    // --- Request body shapes ---

    public record RegisterRequest(String email, String password, String firstName, String lastName) {}

    public record LoginRequest(String email, String password) {}

    public record GoogleLoginRequest(String googleId, String email, String firstName, String lastName) {}
}