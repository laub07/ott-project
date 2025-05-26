package com.example.ott_backend.domain.Favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    boolean existsByUserIdAndContentId(Long userId, String contentId);
    void deleteByUserIdAndContentId(Long userId, String contentId);
    List<Favorite> findByUserId(Long userId);
}



