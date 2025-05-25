import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailPage.css';

const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
const BASE_URL = 'https://api.themoviedb.org/3';

function DetailPage() {
    const { type = 'movie', id } = useParams();
    const [data, setData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, [type, id]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(saved.includes(id));
    }, [id]);

    const toggleFavorite = () => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        const updated = isFavorite
            ? saved.filter(item => item !== id)
            : [...saved, id];
        localStorage.setItem('favorites', JSON.stringify(updated));
        setIsFavorite(!isFavorite);
    };

    if (!data) return <div className="detail-container">로딩 중...</div>;

    return (
        <div className="detail-container">
            <button onClick={() => navigate(-1)} className="back-button">← 뒤로</button>

            <div className="detail-layout">
                <div className="detail-info">
                    <h1>{data.title || data.name}</h1>
                    <button onClick={toggleFavorite} className="favorite-button">
                        {isFavorite ? '💔 찜 해제' : '❤️ 찜하기'}
                    </button>
                    <p><strong>개요:</strong> {data.overview || '정보 없음'}</p>
                    <p><strong>평점:</strong> ⭐ {data.vote_average}</p>
                    <p><strong>장르:</strong> {data.genres?.map(g => g.name).join(', ') || '없음'}</p>
                </div>

                <div className="detail-image">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title || data.name}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
