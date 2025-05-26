package com.example.ott_backend.dto.favorite;

import lombok.Getter;

@Getter
public class FavoriteRequest {
    private Long id;
    private Long userId;
    private String contentId;
    private String contentType;
}



