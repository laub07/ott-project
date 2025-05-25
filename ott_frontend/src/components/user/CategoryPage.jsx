import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
const BASE_URL = 'https://api.themoviedb.org/3';

const ADULT_KEYWORDS = /(노출|섹스|불륜|욕망|배달|정사|야한|비디오|사모|성인|가슴|유혹|자위|몸종|애무|새엄마|노예)/i;
const EXCLUDED_GENRES = [10749]; // 로맨스 제외

const CATEGORY_MAP = [
    { name: '영화', type: 'movie' },
    { name: '드라마', type: 'tv' },
    { name: '예능', type: 'tv', genre: 10764 },
    { name: '애니메이션', type: 'movie', genre: 16 },
    { name: '스릴러', type: 'movie', genre: 53 },
    { name: '로맨스', type: 'movie', genre: 10749 },
    { name: '액션', type: 'movie', genre: 28 },
    { name: '판타지', type: 'movie', genre: 14 },
    { name: 'SF', type: 'movie', genre: 878 },
    { name: '키즈', type: 'movie', genre: 10762 },
];

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryContent, setCategoryContent] = useState([]);
    const [allCategoryContent, setAllCategoryContent] = useState({});

    useEffect(() => {
        CATEGORY_MAP.forEach(fetchCategoryContent);
    }, []);

    const filterAdultContent = (items) => {
        return items.filter(item => {
            const title = (item.title || item.name || '').toLowerCase();
            if (!item.poster_path) return false;
            if (item.adult) return false;
            if (ADULT_KEYWORDS.test(title)) return false;
            if (item.genre_ids?.some(id => EXCLUDED_GENRES.includes(id))) return false;
            return true;
        });
    };

    const fetchCategoryContent = async (category) => {
        const { name, type, genre } = category;
        const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_original_language=ko${genre ? `&with_genres=${genre}` : ''}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            const filtered = filterAdultContent(data.results || []);
            setAllCategoryContent(prev => ({ ...prev, [name]: filtered.slice(0, 12) }));
        } catch (err) {
            console.error(`${name} fetch error:`, err);
        }
    };

    const handleCategoryClick = (name) => {
        setSelectedCategory(name);
        setCategoryContent(allCategoryContent[name] || []);
    };

    return (
        <div className="category-page">
            <h1>카테고리별 모아보기</h1>
            <div className="category-grid">
                {CATEGORY_MAP.map((cat) => (
                    <div key={cat.name} className={`category-box ${selectedCategory === cat.name ? 'active' : ''}`}>
                        <button className="category-card" onClick={() => handleCategoryClick(cat.name)}>
                            <h3>{cat.name}</h3>
                        </button>
                    </div>
                ))}
            </div>

            {selectedCategory ? (
                <div className="category-content">
                    <h2>{selectedCategory}</h2>
                    <div className="content-grid selected-category">
                        {categoryContent.map((item) => (
                            <div className="content-card" key={item.id}>
                                <Link to={`/detail/${item.media_type || (item.title ? 'movie' : 'tv')}/${item.id}`}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                        alt={item.title || item.name}
                                        className="thumbnail-img"
                                    />
                                    <p>{item.title || item.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="category-content2">
                    {CATEGORY_MAP.map((cat) => (
                        <div key={cat.name} className="category-content3">
                            <h3>{cat.name}</h3>
                            <hr width="100%" align="left" />
                            <div className="content-grid">
                                {(allCategoryContent[cat.name] || []).map((item) => (
                                    <div className="content-card" key={item.id}>
                                        <Link to={`/detail/${item.media_type || (item.title ? 'movie' : 'tv')}/${item.id}`}
                                              style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                                alt={item.title || item.name}
                                                className="thumbnail-img"
                                            />
                                            <p>{item.title || item.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
