package com.grouply.backend.security;

import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.UUID;

@Component
@Slf4j
public class JwtService {

    private UserRepository userRepository;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expirationMs}")
    private long EXPIRATION_MS;

    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
        Date now = new Date(System.currentTimeMillis());
        Date expiration = new Date(now.getTime() + EXPIRATION_MS);
        return Jwts.builder()
                .issuer("Grouply")
                .issuedAt(now)
                .expiration(expiration)
                .id(UUID.randomUUID().toString())
                .subject(String.valueOf(user.getId()))
                .claim("id", user.getId())
                .claim("role", user.getRole())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .signWith(getSignInKey())
                .compact();
    }


    private Claims getClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException e) {
            log.error(e.getMessage());
            throw new JwtException(e.getMessage());
        }
    }

    public Long extractId(String token) {
        try {
            return Long.valueOf(getClaims(token).getSubject());
        } catch (JwtException e) {
            throw new JwtException("failed extract id");
        }
    }

    public boolean isValidToken(String token) {

        Date expiration = getClaims(token).getExpiration();
        Date now = new Date(System.currentTimeMillis());

        return !expiration.before(now);
    }

}
