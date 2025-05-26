package com.example.ott_backend.controller;

import com.example.ott_backend.domain.Favorite.Favorite;
import com.example.ott_backend.dto.favorite.FavoriteRequest;
import com.example.ott_backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/favorites")
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public void addFavorite(@RequestBody FavoriteRequest request){
        favoriteService.addFavorite(request);
    }

    @DeleteMapping
    public void DeleteFavorite(@RequestBody FavoriteRequest request){
        favoriteService.DeleteFavorite(request);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Favorite>> getFavorites (@PathVariable Long userId){
        return ResponseEntity.ok(favoriteService.getFavorites(userId));
    }
}





