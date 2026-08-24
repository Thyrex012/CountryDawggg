package com.codewiththyrex.store.dto;

public record AuthResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String role
) {}
