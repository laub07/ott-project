package com.example.ott_backend.dto.login;

import lombok.Getter;

@Getter
public class LoginResponse {
    private boolean success;
    private String message;
    private String token;
    private String role;

    public LoginResponse(String message, String token, String role) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.success = (token != null && !token.isEmpty());
    }
}
