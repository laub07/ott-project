package com.example.ott_backend.dto.admin;

import lombok.Getter;

@Getter
public class AdminResponse {
    private Long id;
    private String adminId;
    private String email;

    public AdminResponse(Long id, String adminId, String email) {
        this.id = id;
        this.adminId = adminId;
        this.email = email;
    }

}
