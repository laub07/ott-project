// src/components/user/UserLayout.jsx
import React, { useState, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './UserLayout.css';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // 바깥 클릭 시 사이드바 닫기
  const handleOutsideClick = (e) => {
    if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) setShowGenres(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  const logout = () => {
    localStorage.removeItem('token');
    alert("로그아웃 되었습니다.");
    navigate('/login');
  };

  return (
    <div
      className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}
      onClick={handleOutsideClick}
    >
      {/* ✅ 헤더 */}
      <header>
        <div className="container">
          <button className="menu-button" onClick={toggleSidebar}>☰</button>
          <img src="/images/로고.png" alt="로고" title="로고" />
          <nav>
            <ul>
              <li className="active"><Link to="/">홈</Link></li>
              <li><a href="#">검색</a></li>
              <li><Link to="/customersupport">고객지원</Link></li>
              <li><a href="#">|</a></li>
              <li className="profile" onClick={toggleProfileMenu}>
                <img src="/images/프로필 사진.png" alt="프로필" className="profile-image" />
                <a href="#">프로필 관리</a>
                {showProfileMenu && (
                  <div
                    className="profile-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="profile-info">
                      <img src="/images/프로필 사진.png" alt="프로필" />
                      <div>
                        <strong>회원1</strong>
                        <div className="sub">프로필 전환 &gt;</div>
                      </div>
                    </div>
                    <hr />
                    <ul>
                      <li>MY</li>
                      <li>고객센터</li>
                      <li onClick={logout}>로그아웃</li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ✅ 사이드바 (ref 연결) */}
      <div
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={toggleSidebar}>×</button>
        <ul>
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

      {/* ✅ 본문 영역 */}
      <main style={{ marginTop: '120px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
