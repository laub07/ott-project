import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const navigate = useNavigate(); // ✅ useState 바깥에 정상 위치로 선언

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSubmenus, setShowSubmenus] = useState({
        managePage: false,
        customerSupport: true,
        notice: false,
        categories: false
    });
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            setShowSubmenus({
                managePage: false,
                customerSupport: false,
                notice: false,
                categories: false
            });
        }
    };



    const toggleSubmenu = (menu) => {
        setShowSubmenus((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };


    const toggleProfileMenu = () => {
        setShowProfileMenu(prev => !prev);
    };

      const logout = () => {
        localStorage.removeItem('token');   // 저장된 로그인 정보 제거
        alert('로그아웃 되었습니다.');
        navigate('/');  // 로그인 페이지로 이동
      };

    const top20Images = [
        "/images/drama/선재업고튀어.webp",
        "/images/drama/폭싹 속았수다.webp",
        "/images/drama/옥씨부인전.webp",
        "/images/drama/겟마을 차차차.webp",
        "/images/drama/시그널.webp",
        "/images/movie/파묘.jpg",
        "/images/entertainment/환승연애2.jpg",
        "/images/entertainment/하트시그널.webp",
        "/images/drama/신병.jpg",
        "/images/drama/중증외상센터.jpg",
        "/images/drama/여신강림.jpg",
        "/images/drama/남자친구.jpg",
        "/images/drama/오 나의 귀신님.jpg",
        "/images/drama/슬기로운 의사생활.webp"
    ];

    return (
        <div className="admin-page-container">
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
                            <li className="profile" onClick={toggleProfileMenu}>
                                <img src="/images/프로필 사진.png" alt="프로필" className="profile-image" />
                                <a href="#">프로필 관리</a>
                                {showProfileMenu && (
                                    <div className="profile-dropdown">
                                        <div className="profile-info">
                                            <img src="/images/프로필 사진.png" alt="프로필" />
                                            <div>
                                                <strong>관리자1</strong>
                                                <div className="sub">프로필 전환 &gt; </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul>
                                            <li>MY</li>
                                            <li>고객문의</li>
                                            <li onClick={logout}>로그아웃</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><a href="#">| 내 정보 수정</a></li>
                    <li onClick={() => toggleSubmenu('managePage')}><a href="#">| 관리 페이지</a></li>
                    <div className={`genres ${showSubmenus.managePage ? 'show' : ''}`}>
                        <ul>
                            <li><a href="#"> ㄴ 사용자 관리</a></li>
                            <li><a href="administrator-management"> ㄴ 관리자 관리</a></li>
                            <li><a href="/distributor-management"> ㄴ 배포자 관리</a></li>
                            <li><a href="#"> ㄴ 장르 관리</a></li>
                        </ul>
                    </div>
                    <hr width="85%" align="center" />

                    <li onClick={() => toggleSubmenu('customerSupport')}><a href="#">| 고객지원</a></li>
                    <div className={`genres ${showSubmenus.customerSupport ? 'show' : ''}`}>
                        <ul>
                            <li><a href="#"> ㄴ FAQ</a></li>
                            <li><a href="#"> ㄴ 버그 신고</a></li>
                        </ul>
                    </div>
                    <hr width="85%" align="center" />
                    <li><a href="/notice">| 공지사항</a></li>
                </ul>
            </div>

            <div className={`content ${sidebarOpen ? 'open' : ''}`}>
                <div className="recommendations">
                    <h3>최근에 업로드한 영상</h3>
                    <hr width="82%" align="left" />
                    <div className="video-list-scroll">
                        {top20Images.map((src, index) => (
                            <div className="video-item" key={index}>
                                <div className="video-thumb">
                                    <img src={src} alt={`ott 사진 ${index + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <br />

                <div className="additional-sections">
                    <div className="notice-section">
                        <h4>공지사항</h4>
                        <hr width="100%" align="center" />
                        <ul>
                            <li>공지사항 1</li>
                            <li>공지사항 2</li>
                            <li>공지사항 3</li>
                            <li>공지사항 4</li>
                        </ul>
                    </div>
                    <div className="customer-inquiries-section">
                        <h4>고객문의</h4>
                        <hr width="100%" align="center" />
                        <ul>
                            <li>고객문의 1</li>
                            <li>고객문의 2</li>
                            <li>고객문의 3</li>
                            <li>고객문의 4</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;