import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryContent, setCategoryContent] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData = [
                {
                    id: 1,
                    name: '영화',
                    content: [
                        { url: '/images/movie/소방관.webp', title: '소방관' },
                        { url: '/images/movie/히트맨.jpg', title: '히트맨' },
                        { url: '/images/movie/서울의 봄.webp', title: '서울의 봄' },
                        { url: '/images/movie/승부.webp', title: '승부' },
                        { url: '/images/movie/탈주.jpg', title: '탈주' },
                        { url: '/images/movie/탈출.jpg', title: '탈출' },
                        { url: '/images/movie/파묘.jpg', title: '파묘' },
                        { url: '/images/movie/독친.jpg', title: '독친' },
                        { url: '/images/movie/마이 매드 팻 다이어리.jpg', title: '마이 매드 팻 다이어리' },
                    ]
                },
                {
                    id: 2,
                    name: '드라마',
                    content: [
                        { url: '/images/drama/선재업고튀어.webp', title: '선재 업고 튀어' },
                        { url: '/images/drama/중증외상센터.jpg', title: '중증외상센터' },
                        { url: '/images/drama/옥씨부인전.webp', title: '옥씨부인전' },
                        { url: '/images/drama/슬기로운 의사생활.webp', title: '슬기로운 의사생활' },
                        { url: '/images/drama/시그널.webp', title: '시그널' },
                        { url: '/images/drama/겟마을 차차차.webp', title: '겟마을 차차차' },
                        { url: '/images/drama/신병.jpg', title: '신병' },
                        { url: '/images/drama/오 나의 귀신님.jpg', title: '오 나의 귀신님' },
                        { url: '/images/drama/남자친구.jpg', title: '남자친구' },
                        { url: '/images/drama/폭싹 속았수다.webp', title: '폭싹 속았수다' },
                        { url: '/images/drama/여신강림.jpg', title: '여신강림' },
                        { url: '/images/drama/사랑의 불시착.jpg', title: '사랑의 불시착' }
                    ]
                },
                {
                    id: 3,
                    name: '애니메이션',
                    content: [
                        { url: '/images/animation/신령님 토모에.jpg', title: '신령님 토모에' },
                        { url: '/images/animation/안녕 자두야.png', title: '안녕 자두야' },
                        { url: '/images/animation/짱구는못말려.jpg', title: '짱구는 못 말려' },
                        { url: '/images/animation/원피스.jpg', title: '원피스' }
                    ]
                },

                {
                    id: 4,
                    name: '예능',
                    content: [
                        { url: '/images/entertainment/런닝맨.webp', title: '런닝맨' },
                        { url: '/images/entertainment/부산촌놈.jpg', title: '부산촌놈' },
                        { url: '/images/entertainment/환승연애2.jpg', title: '환승연애2' },
                        { url: '/images/entertainment/하트시그널.webp', title: '하트시그널' }
                    ]
                },
                {
                    id: 5,
                    name: '코믹',
                    content: [
                        { url: 'https://www.youtube.com/embed/RuLl6o1fdpI', title: '극한직업' },
                        { url:  'https://www.youtube.com/embed/aro3qiZDQO8', title: '지붕 뚫고 하이킥' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url:  'https://www.youtube.com/embed/U0SLqH36d04', title: '짧은다리의 역습' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/aro3qiZDQO8', title: '순풍산부인과' },
                        { url: 'https://www.youtube.com/embed/RuLl6o1fdpI', title: '극한직업' },
                        { url:  'https://www.youtube.com/embed/aro3qiZDQO8', title: '지붕 뚫고 하이킥' }
                    ]
                },
                {
                    id: 6,
                    name: '스릴러',
                    content: [
                        { url:  'https://www.youtube.com/embed/93k1UJG_YVs', title: '곡성' },
                        { url: 'https://www.youtube.com/embed/NLNtMSlMxHw', title: '사바하' },
                        { url: 'https://www.youtube.com/embed/l0Ja3DhS3oM', title: '파묘' },
                        { url:  'https://www.youtube.com/embed/93k1UJG_YVs', title: '곡성' },
                        { url: 'https://www.youtube.com/embed/NLNtMSlMxHw', title: '사바하' },
                        { url: 'https://www.youtube.com/embed/l0Ja3DhS3oM', title: '파묘' },
                        { url:  'https://www.youtube.com/embed/93k1UJG_YVs', title: '곡성' },
                        { url: 'https://www.youtube.com/embed/NLNtMSlMxHw', title: '사바하' }
                    ]
                },
                {
                    id: 7,
                    name: '로맨스',
                    content: [
                        { url: 'https://www.youtube.com/embed/FFmdTU4Cpr8', title: '사랑의 불시착' },
                        { url: 'https://www.youtube.com/embed/OTPQ0IlDwFs', title: '선재 업고 튀어' },
                        { url: 'https://www.youtube.com/embed/xU47nhruN-Q', title: '너의 이름은' },
                        { url: 'https://www.youtube.com/embed/FFmdTU4Cpr8', title: '사랑의 불시착' },
                        { url: 'https://www.youtube.com/embed/OTPQ0IlDwFs', title: '선재 업고 튀어' },
                        { url: 'https://www.youtube.com/embed/xU47nhruN-Q', title: '너의 이름은' },
                        { url: 'https://www.youtube.com/embed/FFmdTU4Cpr8', title: '사랑의 불시착' },
                        { url: 'https://www.youtube.com/embed/OTPQ0IlDwFs', title: '선재 업고 튀어' },
                    ]
                },
                {
                    id: 8,
                    name: '액션',
                    content: [
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' },
                        { url: 'https://www.youtube.com/embed/47ZSLkyuWi4', title: '엑시트' }
                    ]
                },
                {
                    id: 9,
                    name: '판타지',
                    content: [
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 1' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 2' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 3' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 4' },
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 5' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 6' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 7' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 8' }
                    ]
                },
                {
                    id: 10,
                    name: 'SF',
                    content: [
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 1' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 2' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 3' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 4' },
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 5' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 6' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 7' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 8' }
                    ]
                },
                {
                    id: 9,
                    name: '키즈',
                    content: [
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 1' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 2' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 3' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 4' },
                        { url: 'https://www.youtube.com/embed/def456', title: '콘텐츠 5' },
                        { url: 'https://www.youtube.com/embed/yza567', title: '콘텐츠 6' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 7' },
                        { url: 'https://www.youtube.com/embed/bcd890', title: '콘텐츠 8' }
                    ]
                },
            ];


            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCategoryContent = (categoryId) => {
        const categoryData = categories.find((category) => category.id === categoryId);
        if (categoryData) {
            setCategoryContent(categoryData.content);
            setSelectedCategory(categoryData);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setShowGenres(false); // Close genre section when sidebar is closed
    };

    const toggleGenres = () => {
        setShowGenres(!showGenres);
    };

    return (
        <>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>
                        ☰
                    </button>
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
                <ul className="sidebar-list">
                    <li><a href="#">|　시청기록</a></li>
                    <li><Link to="/Favorites">|　즐겨찾기 콘텐츠</Link></li>
                    <li onClick={toggleGenres}><a href="#">|　카테고리별 모아보기</a></li>
                    <div className={`genres ${showGenres ? 'show' : ''}`}>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <a href="#" onClick={() => fetchCategoryContent(category.id)}>
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr width="85%" align="center"></hr>
                    <li><a href="#">|　설정</a></li>
                </ul>
            </div>

            <div className={`category-page ${sidebarOpen ? 'content-shift' : ''}`}>
                <h1>카테고리별 모아보기</h1>
                <div className="category-grid">
                    {categories.map((category) => (
                        <div key={category.id} className={`category-box ${selectedCategory?.id === category.id ? 'active' : ''}`}>
                            <button
                                className="category-card"
                                onClick={() => fetchCategoryContent(category.id)}
                            >
                                <h3>{category.name}</h3>
                            </button>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="category-content">
                        <h2>{selectedCategory.name}</h2>
                        <div className="content-grid selected-category">
                            {categoryContent.map((content, index) => (
                                <div className="content-card" key={index}>
                                    <img
                                        src={content.url}
                                        title={`YouTube video player ${index}`}
                                        className="thumbnail-img"
                                        style={{ width: '180px', height: '260px', objectFit: 'cover' }}
                                        //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        //allowFullScreen
                                    ></img>
                                    <p>{content.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!selectedCategory && (
                    <div className="category-content2">
                        {categories.map((category) => (
                            <div key={category.id} className="category-content3">
                                <h3>{category.name}</h3>
                                <hr width="100%" align="left" />
                                <div className="content-grid">
                                    {category.content.map((content, index) => (
                                        <div className="content-card" key={index}>
                                            <img
                                                width="180"
                                                height="260"
                                                src={content.url}
                                                title={`ott ${index}`}
                                               // frameBorder="0"
                                                //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                               // allowFullScreen
                                            ></img>
                                            <p>{content.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
