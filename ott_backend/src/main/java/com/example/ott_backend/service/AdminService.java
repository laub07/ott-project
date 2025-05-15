package com.example.ott_backend.service;

import com.example.ott_backend.domain.admin.Admin;
import com.example.ott_backend.domain.admin.AdminRepository;
import com.example.ott_backend.dto.admin.AdminRequest;
import com.example.ott_backend.dto.admin.AdminResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    @Transactional
    public List<AdminResponse> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(admin -> new AdminResponse(admin.getId(), admin.getAdminId(), admin.getEmail()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void addAdmin(AdminRequest request){
        Admin admin = new Admin();
        admin.setAdminId(request.getAdminId());
        admin.setPassword(request.getPassword());
        admin.setEmail(request.getEmail());
        admin.setPhone(request.getPhone());

        adminRepository.save(admin);
    }

    @Transactional
    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("관리자가 존재하지 않습니다."));
        adminRepository.delete(admin);
    }


}



