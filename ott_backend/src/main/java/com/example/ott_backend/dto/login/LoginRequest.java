package com.example.ott_backend.dto.login;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String id;
    private String password;
    private String role;

}


