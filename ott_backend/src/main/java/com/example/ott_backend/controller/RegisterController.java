package com.example.ott_backend.controller;

import com.example.ott_backend.dto.RegisterRequest;
import com.example.ott_backend.service.RegisterService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RestController
public class RegisterController {
    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        System.out.println("📨 회원가입 요청 수신: " + request.getUserId() + ", " + request.getEmail());
        String message = registerService.register(request);
        return ResponseEntity.ok(message);
    }
}


