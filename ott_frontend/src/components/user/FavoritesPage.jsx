// FavoritesPage.jsx (수정된 버전)
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
const BASE_URL = 'https://api.themoviedb.org/3';

const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedIds = JSON.parse(localStorage.getItem('favorites')) || [];

        // movie와 tv 두 번 나눠서 fetch
        const fetchFavorites = async () => {
            const movieRequests = storedIds.map(id =>
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
            );

            const tvRequests = storedIds.map(id =>
                fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
            );

            const results = await Promise.all([...movieRequests, ...tvRequests]);
            const filtered = results.filter(item => item && item.id);
            setFavorites(filtered);
        };

        fetchFavorites();
    }, []);

    return (
        <div className="favorites-container">
            <h1>즐겨찾기 콘텐츠</h1>
            <div className="favorites-grid">
                {favorites.map(item => (
                    <div key={item.id} className="favorite-item">
                        <Link
                            to={`/detail/${item.media_type || (item.title ? 'movie' : 'tv')}/${item.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.title || item.name}
                                className="thumbnail-img"
                            />
                            <div className="video-title">{item.title || item.name}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
