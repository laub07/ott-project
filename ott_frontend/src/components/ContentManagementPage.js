import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ContentManagementPage.css';

const ContentManagementPage = () => {
    const [contents, setContents] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [genreFilter, setGenreFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const mockData = [
            { id: 1, title: '인사이드 아웃', genre: '영화', cast: 'Amy Poehler, Bill Hader', description: '애니메이션 영화', date: '2024-07-07' },
            { id: 2, title: '선재 업고 튀어', genre: '드라마', cast: 'Kim Soo Hyun, Seo Ye Ji', description: '드라마', date: '2024-07-07' },
            { id: 3, title: '너의 이름은', genre: '애니메이션', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi', description: '애니메이션 영화', date: '2024-07-07' },
            { id: 4, title: '슬램덩크', genre: '애니메이션', cast: 'Hisao Egawa, Eriko Hara', description: '스포츠 애니메이션', date: '2024-07-07' },
            { id: 5, title: '인사이드 아웃', genre: '영화', cast: 'Amy Poehler, Bill Hader', description: '애니메이션 영화', date: '2024-07-07' },
            { id: 6, title: '선재 업고 튀어', genre: '드라마', cast: 'Kim Soo Hyun, Seo Ye Ji', description: '드라마', date: '2024-07-07' },
            { id: 7, title: '너의 이름은', genre: '애니메이션', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi', description: '애니메이션 영화', date: '2024-07-07' },
            { id: 8, title: '슬램덩크', genre: '애니메이션', cast: 'Hisao Egawa, Eriko Hara', description: '스포츠 애니메이션', date: '2024-07-07' }
        ];
        setContents(mockData);
    }, []);

    const handleDelete = (id) => {
        const updatedContents = contents.filter(content => content.id !== id);
        setContents(updatedContents);
    };

    const handleRowClick = (content) => {
        setSelectedContent(content);
    };

    const handleCloseModal = () => {
        setSelectedContent(null);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleAddContent = () => {
        navigate('/ContentUpload');
    };

    const handleGenreChange = (e) => {
        setGenreFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredContents = contents.filter(content => {
        return (
            (!genreFilter || content.genre === genreFilter) &&
            content.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className={`viewing-history ${sidebarOpen ? 'open' : ''}`}>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <img src="/images/로고.png" alt="로고" title="로고" />
                    <nav>
                        <ul>
                            <li className="active"><a href="#">홈</a></li>
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
                    <li><Link to="/ContentManagement">| 콘텐츠 관리</Link></li>
                    <li><Link to="/ContentUpload">| 콘텐츠 업로드</Link></li>
                </ul>
            </div>
            <div className="content-management-page">
                <h2>콘텐츠 관리</h2>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="검색 창"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button>검색</button>
                        <button onClick={handleAddContent}>콘텐츠 추가</button>
                    </div>
                </div>
                <div className="filter-container">
                    <label htmlFor="genre-filter"></label>
                    <select id="genre-filter" value={genreFilter} onChange={handleGenreChange}>
                        <option value="">전체</option>
                        <option value="애니메이션">애니메이션</option>
                        <option value="드라마">드라마</option>
                        <option value="영화">영화</option>
                    </select>
                </div>
                <div className="total-count-container">
                    <p className="total-count">총 콘텐츠 수: {filteredContents.length}</p>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>장르</th>
                        <th>업로드 날짜</th>
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredContents.map((content) => (
                        <tr key={content.id} onClick={() => handleRowClick(content)}>
                            <td>{content.title}</td>
                            <td>{content.genre}</td>
                            <td>{content.date}</td>
                            <td><button onClick={(e) => { e.stopPropagation(); handleDelete(content.id); }} className="delete-button">삭제</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {selectedContent && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <h3>{selectedContent.title}</h3>
                                <p><strong>장르:</strong> {selectedContent.genre}</p>
                                <p><strong>출연자:</strong> {selectedContent.cast}</p>
                                <p><strong>설명:</strong> {selectedContent.description}</p>
                                <p><strong>업로드 날짜:</strong> {selectedContent.date}</p>
                                <button onClick={handleCloseModal}>닫기</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagementPage;
