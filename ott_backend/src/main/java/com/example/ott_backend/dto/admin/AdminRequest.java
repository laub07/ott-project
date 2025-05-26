package com.example.ott_backend.dto.admin;

import lombok.Getter;

@Getter
public class AdminRequest {
    private String adminId;
    private String password;
    private String email;
    private String phone;
}



