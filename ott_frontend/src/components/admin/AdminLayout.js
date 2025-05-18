import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSubmenus, setShowSubmenus] = useState({
    managePage: false,
    customerSupport: false,
  });

  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // ✅ 바깥 클릭 시 사이드바 닫기 (useEffect로 등록)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleSubmenu = (menu) => {
    setShowSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* ✅ 헤더 */}
      <header>
        <div className="container">
          <button className="menu-button" onClick={toggleSidebar}>☰</button>
          <img src="/images/로고.png" alt="로고" title="로고" />
          <nav>
            <ul>
              <li className="active"><a href="/admin">홈</a></li>
              <li><a href="#">검색</a></li>
              <li><a href="#">고객지원</a></li>
              <li><a href="#">|</a></li>
              <li className="profile" onClick={toggleProfileMenu}>
                <img src="/images/프로필 사진.png" alt="프로필" className="profile-image" />
                <a href="#">프로필 관리</a>
                {showProfileMenu && (
                  <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                    <div className="profile-info">
                      <img src="/images/프로필 사진.png" alt="프로필" />
                      <div>
                        <strong>관리자1</strong>
                        <div className="sub">프로필 전환 &gt;</div>
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

      {/* ✅ 사이드바 */}
      <div
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={toggleSidebar}>×</button>
        <ul>
          <li><a href="#">| 내 정보 수정</a></li>
          <li onClick={() => toggleSubmenu('managePage')}>
            <a href="#">| 관리 페이지</a>
          </li>
          <div className={`genres ${showSubmenus.managePage ? 'show' : ''}`}>
            <ul>
              <li><Link to="/admin/users"> ㄴ 사용자 관리</Link></li>
              <li><Link to="/admin/administrator"> ㄴ 관리자 관리</Link></li>
              <li><Link to="/admin/distributor"> ㄴ 배포자 관리</Link></li>
              <li><a href="#"> ㄴ 장르 관리</a></li>
            </ul>
          </div>

          <hr width="85%" align="center" />

          <li onClick={() => toggleSubmenu('customerSupport')}>
            <a href="#">| 고객지원</a>
          </li>
          <div className={`genres ${showSubmenus.customerSupport ? 'show' : ''}`}>
            <ul>
              <li><a href="#"> ㄴ FAQ</a></li>
              <li><a href="#"> ㄴ 버그 신고</a></li>
            </ul>
          </div>

          <hr width="85%" align="center" />
          <li><a href="/admin/notice">| 공지사항</a></li>
        </ul>
      </div>

      {/* ✅ 본문 */}
      <main style={{ marginTop: '120px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
