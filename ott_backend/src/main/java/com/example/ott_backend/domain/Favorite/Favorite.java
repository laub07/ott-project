package com.example.ott_backend.domain.Favorite;

import jakarta.persistence.*;
import lombok.Setter;

@Setter
@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String contentId;
    private String contentType;

}



