package com.example.ott_backend.controller;


import com.example.ott_backend.dto.login.LoginRequest;
import com.example.ott_backend.dto.login.LoginResponse;
import com.example.ott_backend.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RestController
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/user")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);

        if (response.getRole() == null) {
            return ResponseEntity.status(401).body(response); // 실패 시 401
        }

        return ResponseEntity.ok(response); // 성공 시 200
    }
}



