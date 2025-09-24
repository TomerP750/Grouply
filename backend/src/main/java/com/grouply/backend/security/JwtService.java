package com.grouply.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class JwtService {

    @Value("${}")
    private String SECRET;

    @Value("${}")
    private long EXPIRATION_MS;

    public String generateToken(Long userId) {
        Date now = new Date(System.currentTimeMillis());
        Date expiration = new Date(now.getTime() + EXPIRATION_MS);
        return null;
    }


    public boolean isValidToken(String token) {
        return true;
    }

}
