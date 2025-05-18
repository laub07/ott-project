package com.example.ott_backend.dto.user;

public class UserResponse {
    private Long id;
    private String userId;
    private String email;

    public UserResponse(Long id, String userId, String email) {
        this.id = id;
        this.userId = userId;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}





