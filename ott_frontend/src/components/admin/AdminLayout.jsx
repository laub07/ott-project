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
  const profileMenuRef = useRef(null); // 드롭다운 참조

  // 바깥 클릭 시 사이드바 또는 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }

      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, showProfileMenu]);

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

  const navigateAndClose = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem('Authorization');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <header>
        <div className="container">
          <button className="menu-button" onClick={toggleSidebar}>☰</button>
          <Link to="/admin">
            <img src="/images/로고.png" alt="로고" title="로고" style={{ cursor: 'pointer' }} />
          </Link>

          <nav>
            <ul>
              <li><a href="/admin">홈</a></li>
              <li><a href="/search">검색</a></li>
              <li><a href="#">고객지원</a></li>
              <li><a href="#">|</a></li>
              <li className="profile" onClick={toggleProfileMenu}>
                <img src="/images/프로필 사진.png" alt="프로필" className="profile-image" />
                <a href="#">관리자 1</a>
                {showProfileMenu && (
                  <div
                    className="profile-dropdown"
                    ref={profileMenuRef} // ✅ 드롭다운 ref 연결
                  >
                    <div className="profile-info">
                      <img src="/images/프로필 사진.png" alt="프로필" />
                      <div>
                        <strong>관리자1</strong>
                        <div className="sub">프로필 전환 &gt;</div>
                      </div>
                    </div>
                    <hr />
                    <ul>
                      <li onClick={() => setShowProfileMenu(false)}>MY</li>
                      <li onClick={() => setShowProfileMenu(false)}>고객문의</li>
                      <li onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}>로그아웃</li>
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
          <li><a onClick={() => setSidebarOpen(false)}>| 내 정보 수정</a></li>
          <li onClick={() => toggleSubmenu('managePage')}>
            <a href="#">| 관리 페이지</a>
          </li>
          <div className={`genres ${showSubmenus.managePage ? 'show' : ''}`}>
            <ul>
              <li><a onClick={() => navigateAndClose("/admin/users")}> ㄴ 사용자 관리</a></li>
              <li><a onClick={() => navigateAndClose("/admin/administrator")}> ㄴ 관리자 관리</a></li>
              <li><a onClick={() => navigateAndClose("/admin/distributor")}> ㄴ 배포자 관리</a></li>
              <li><a onClick={() => setSidebarOpen(false)}> ㄴ 장르 관리</a></li>
            </ul>
          </div>
          <hr width="85%" align="center" />
          <li onClick={() => navigateAndClose('customerSupport')}>
            <a href="#">| 고객지원</a>
          </li>
          <div className={`genres ${showSubmenus.customerSupport ? 'show' : ''}`}>
            <ul>
              <li><a href="#"> ㄴ FAQ</a></li>
              <li><a href="#"> ㄴ 버그 신고</a></li>
            </ul>
          </div>
          <hr width="85%" align="center" />
          <li><a onClick={() => navigateAndClose('/admin/notice')}>| 공지사항</a></li>
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
