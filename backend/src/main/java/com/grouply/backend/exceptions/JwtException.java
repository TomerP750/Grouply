package com.grouply.backend.exceptions;

public class JwtException extends Exception {
    public JwtException(String message) {
        super(message);
    }
}
