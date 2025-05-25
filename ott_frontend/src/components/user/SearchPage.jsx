import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
    const BASE_URL = 'https://api.themoviedb.org/3/search/multi';

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ko-KR`
            );
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('검색 실패:', error);
        }
    };

    return (
        <div className="search-container">
            {/* 검색창 */}
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="영화나 TV 프로그램 제목을 입력하세요"
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {/* 검색 결과 타이틀 */}
            {results.length > 0 && (
                <h2 className="search-title">“{query}” 검색 결과</h2>
            )}

            {/* 카드 리스트 */}
            <div className="card-list">
                {results.map((item, index) => {
                    const id = item.id;
                    const title = item.title || item.name;
                    const poster = item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : '/images/no-image.png';
                    const type = item.media_type; // 'movie' 또는 'tv'

                    // movie 또는 tv만 허용 (person은 제외)
                    if (type !== 'movie' && type !== 'tv') return null;

                    return (
                        <Link to={`/detail/${type}/${id}`} key={index} className="card">
                            <img src={poster} alt={title} />
                            <p>{title}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchPage;
