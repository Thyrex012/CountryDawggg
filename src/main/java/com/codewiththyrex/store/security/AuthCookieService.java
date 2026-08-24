package com.codewiththyrex.store.security;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AuthCookieService {

    public static final String COOKIE_NAME = "access_token";
    private static final Duration TOKEN_LIFETIME = Duration.ofHours(10);

    public ResponseCookie createJwtCookie(String token) {
        return ResponseCookie.from(COOKIE_NAME, token)
                .httpOnly(true)
                .secure(false) // Set to true when the deployed app uses HTTPS.
                .sameSite("Lax")
                .path("/")
                .maxAge(TOKEN_LIFETIME)
                .build();
    }

    public ResponseCookie clearJwtCookie() {
        return ResponseCookie.from(COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false) // Set to true when the deployed app uses HTTPS.
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
    }
}
