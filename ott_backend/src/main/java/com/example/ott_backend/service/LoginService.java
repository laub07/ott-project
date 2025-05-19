package com.example.ott_backend.service;

import com.example.ott_backend.domain.admin.AdminRepository;
import com.example.ott_backend.domain.user.UserRepository;
import com.example.ott_backend.dto.login.LoginRequest;
import com.example.ott_backend.dto.login.LoginResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    public LoginService(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public LoginResponse login(LoginRequest request) {
        String id = request.getId();
        String password = request.getPassword();
        String role = request.getRole();


        if (adminRepository.findByAdminIdAndPassword(id, password).isPresent()) {
            return new LoginResponse("로그인 성공", "token","ADMIN");
        }

        if (userRepository.findByUserIdAndPassword(id, password).isPresent()) {
            return new LoginResponse("로그인 성공", "token","USER");
        }

       // throw new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.");
        return new LoginResponse("로그인 실패", null, null);
    }
}



