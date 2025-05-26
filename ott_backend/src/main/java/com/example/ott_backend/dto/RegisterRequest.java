package com.example.ott_backend.dto;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String userId;
    private String adminId;
    private String password;
    private String passwordconfirm;
    private String email;
    private String phone;
    private String role;

}



