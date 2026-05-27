package com.grouply.backend.shared.exceptions;

public class JwtException extends Exception {
    public JwtException(String message) {
        super(message);
    }
}
