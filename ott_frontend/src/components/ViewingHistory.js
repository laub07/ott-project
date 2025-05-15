import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ViewingHistory.css';

const ViewingHistory = () => {
    const [history, setHistory] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const mockData = [
            { title: '선재 업고 튀어 1화', url: '/images/drama/선업튀시청1.jpg', date: '2024-07-07T15:30:00Z' },
            { title: '선재 업고 튀어 5화', url: '/images/drama/선업튀시청2.jpg', date: '2024-09-07T15:30:00Z' },
            { title: '슬기로운 의사생활 3화', url: '/images/drama/슬의생시청1.webp', date: '2024-09-07T19:00:00Z' },
            { title: '슬기로운 의사생활 4화', url: '/images/drama/슬의생시청2.jpg', date: '2024-09-07T19:00:00Z' },
            { title: '슬기로운 의사생활 5화', url: '/images/drama/슬의생시청3.webp', date: '2024-09-07T19:00:00Z' },
            { title: '중증외상센터 1화', url: '/images/drama/중증시청1.jpg', date: '2024-10-07T19:00:00Z' },
            { title: '중증외상센터 2화', url: '/images/drama/중증시청2.jpg', date: '2024-10-07T19:00:00Z' },
        ];
        setHistory(mockData);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (sidebarOpen) {
            setShowGenres(false);
        }
    };

    const navigateToCategory = () => {
        navigate('/category');
    };

    return (
        <div className={`viewing-history ${sidebarOpen ? 'open' : ''}`}>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>☰</button>
                    <img src="/images/로고.png" alt="로고" title="로고" />
                    <nav>
                        <ul>
                            <li className="active"><a href="#">홈</a></li>
                            <li><a href="#">검색</a></li>
                            <li><a href="#">고객지원</a></li>
                            <li><a href="#">|</a></li>
                            <img src="/images/프로필 사진.png" alt="프로필" title="프로필" className="profile-image" />
                            <li className="profile"><a href="#">프로필 관리</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><Link to="/ViewingHistory">|　시청기록</Link></li>
                    <li><Link to="/Favorites">|　즐겨찾기 콘텐츠</Link></li>
                    <li onClick={navigateToCategory}>
                        <a href="#">|　카테고리별 모아보기</a>
                    </li>
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

            <div className={`viewing-history-main-content ${sidebarOpen ? 'open' : ''}`}>
                <h2>시청 기록</h2>
                <div className="grid-container">
                    {history.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <img
                                src={item.url}
                                alt={item.title}
                                className="thumbnail"
                            />
                            <div className="grid-item-content">
                                <h3>{item.title}</h3>
                                <p>시청 날짜: {new Date(item.date).toLocaleDateString('ko-KR')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewingHistory;
