package com.example.ott_backend.service;

import com.example.ott_backend.domain.admin.Admin;
import com.example.ott_backend.domain.admin.AdminRepository;
import com.example.ott_backend.domain.user.User;
import com.example.ott_backend.domain.user.UserRepository;
import com.example.ott_backend.dto.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    public RegisterService(UserRepository userRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }
    @Transactional
    public String register(RegisterRequest request) {
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            // 아이디 중복 확인
            if (adminRepository.existsByAdminId(request.getAdminId())) {
                throw new IllegalArgumentException("이미 존재하는 ID입니다.");
            }
            // 관리자 회원정보 저장
            Admin admin = new Admin();
            admin.setAdminId(request.getAdminId());
            admin.setPassword(request.getPassword());
            admin.setEmail(request.getEmail());
            admin.setPhone(request.getPhone());

            adminRepository.save(admin);
            return "관리자 회원가입 완료";

        } else {
            // 아이디 중복 확인
            if (userRepository.existsByUserId(request.getUserId())) {
                throw new IllegalArgumentException("이미 존재하는 ID입니다.");
            }
            // 관리자 회원정보 저장
            User user = new User();
            user.setUserId(request.getUserId());
            user.setPassword(request.getPassword());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());

            userRepository.save(user);
            return "사용자 회원가입 완료";


        }
    }

}
