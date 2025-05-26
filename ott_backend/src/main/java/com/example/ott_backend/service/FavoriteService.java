package com.example.ott_backend.service;

import com.example.ott_backend.domain.Favorite.Favorite;
import com.example.ott_backend.domain.Favorite.FavoriteRepository;
import com.example.ott_backend.dto.favorite.FavoriteRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public void addFavorite(FavoriteRequest request) {
        if (!favoriteRepository.existsByUserIdAndContentId(request.getUserId(), request.getContentId())) ;
        Favorite favorite = new Favorite();
        favorite.setId(request.getId());
        favorite.setUserId(request.getUserId());
        favorite.setContentId(request.getContentId());
        favorite.setContentType(request.getContentType());

        favoriteRepository.save(favorite);
    }

    @Transactional
    public void DeleteFavorite(FavoriteRequest request) {
        favoriteRepository.deleteByUserIdAndContentId(request.getUserId(), request.getContentId());
    }


    @Transactional
    public List<Favorite> getFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

}




