package com.example.ott_backend.dto.login;

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

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getRole() {
        return role;
    }
}
