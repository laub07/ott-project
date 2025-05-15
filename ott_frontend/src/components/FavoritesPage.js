import React, { useState } from 'react';
import './FavoritesPage.css';
import { Link, useNavigate } from 'react-router-dom';

const Favorites = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showGenres, setShowGenres] = useState(false);

    const favoriteItems = [
        {
            id: 1,
            title: '최신순',
            genre: '최신순',
            videos: [
                { url: '/images/drama/여신강림.jpg', title: '여신강림' },
                { url: '/images/movie/파묘.jpg', title: '파묘' },
                { url: '/images/entertainment/환승연애2.jpg', title: '환승연애' },
                { url: '/images/animation/원피스.jpg', title: '원피스' }
            ]
        },
        {
            id: 2,
            title: '영화',
            genre: '영화',
            videos: [
                { url: '/images/movie/서울의 봄.webp', title: '서울의 봄' },
                { url: '/images/movie/소방관.webp', title: '소방관' },
                { url: '/images/movie/파묘.jpg', title: '파묘' },
                { url: '/images/movie/히트맨.jpg', title: '히트맨' },
                { url: '/images/movie/탈출.jpg', title: '탈출' }
            ]
        },
        {
            id: 3,
            title: '드라마',
            genre: '드라마',
            videos: [
                { url: '/images/drama/겟마을 차차차.webp', title: '겟마을 차차차' },
                { url: '/images/drama/슬기로운 의사생활.webp', title: '슬기로운 의사생활' },
                { url: '/images/drama/시그널.webp', title: '시그널' },
                { url: '/images/drama/중증외상센터.jpg', title: '중증 외상 센터' }
            ]
        },
        {
            id: 4,
            title: '애니메이션',
            genre: '애니메이션',
            videos: [
                { url: '/images/animation/신령님 토모에.jpg', title: '신령님 토모에' },
                { url: '/images/animation/원피스.jpg', title: '원피스' },
                { url: '/images/animation/짱구는못말려.jpg', title: '짱구는 못 말려' },
                { url: '/images/animation/안녕 자두야.png', title: '안녕 자두야' }
            ]
        },
        {
            id: 5,
            title: '시청 시작 안함',
            genre: '시청 시작 안함',
            videos: [
                { url: '/images/movie/탈주.jpg', title: '탈주' },
                { url: '/images/drama/오 나의 귀신님.jpg', title: '오 나의 귀신님' }
            ]
        },
        {
            id: 6,
            title: '시청 시작함',
            genre: '시청 시작함',
            videos: [
                { url: '/images/movie/서울의 봄.webp', title: '서울의 봄' },
                { url: '/images/animation/짱구는못말려.jpg', title: '짱구는 못 말려' },
                { url: '/images/drama/폭싹 속았수다.webp', title: '폭싹 속았수다' },
            ]
        }
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (sidebarOpen) {
            setShowGenres(false);
        }
    };

    const toggleGenres = () => {
        setShowGenres(!showGenres);
    };

    const navigateToCategory = () => {
        navigate('/category');
    };

    return (
        <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <Link to="/main" className="logo-link">
                        <img src="/images/로고.png" alt="로고" title="로고" />
                    </Link>
                    <nav>
                        <ul>
                            <li className="active"><Link to="/main">홈</Link></li>
                            <li><Link to="/search">검색</Link></li>
                            <li><Link to="/support">고객지원</Link></li>
                            <li><a href="#">|</a></li>
                            <img src="/images/프로필 사진.png" alt="프로필" title="프로필" className="profile-image" />
                            <li className="profile"><a href="#">프로필 관리</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleSidebar}>×</button>
                <ul className="sidebar-list">
                    <li><Link to="/viewing-history">|　시청기록</Link></li>
                                 <li><Link to="/favorites">|　즐겨찾기 콘텐츠</Link></li>
                                        <li><Link to="/category">|　카테고리별 모아보기</Link></li>
                    <div className={`genres ${showGenres ? 'show' : ''}`}>
                        <ul>
                            <li><a href="#">　　ㄴ 영화</a></li>
                            <li><a href="#">　　ㄴ 드라마</a></li>
                            <li><a href="#">　　ㄴ 애니메이션</a></li>
                            <li><a href="#">　　ㄴ 스릴러</a></li>
                            <li><a href="#">　　ㄴ 로맨스</a></li>
                            <li><a href="#">　　ㄴ 액션</a></li>
                        </ul>
                    </div>
                    <hr width="85%" align="center" />
                    <li><a href="#">|　설정</a></li>
                </ul>
            </div>

            <div className="favorites-container">
                <h1>즐겨찾기 목록</h1>
                <div className="favorites-grid">
                    {favoriteItems.map(item => (
                        <div key={item.id} className="favorite-item">
                            <p>{item.genre}</p>
                            <hr width="95%" align="left" />
                            <div className="video-list">
                                {item.videos.map((video, index) => {
                                    const isImage = video.url.match(/\.(jpg|png|webp)$/i);
                                    return (
                                        <div key={index} className="video-item">
                                            {isImage && (
                                                <img
                                                    src={video.url}
                                                    alt={video.title}
                                                    className="thumbnail-img"
                                                    style={{ width: '180px', height: '260px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <div className="video-title">{video.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
