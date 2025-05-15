package com.example.ott_backend.controller;

import com.example.ott_backend.dto.admin.AdminRequest;
import com.example.ott_backend.dto.admin.AdminResponse;
import com.example.ott_backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<AdminResponse> getAdmins() {
        return adminService.getAllAdmins();
    }

    @PostMapping
    public ResponseEntity<Void> addAdmin(@RequestBody AdminRequest request) {
        adminService.addAdmin(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}


