import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

// Layout 컴포넌트
import UserLayout from './components/user/UserLayout';
import AdminLayout from './components/admin/AdminLayout';

// 사용자 페이지
import MainPage from './components/user/MainPage';
import FavoritesPage from './components/user/FavoritesPage';
import CategoryPage from './components/user/CategoryPage';
import ViewingHistory from './components/user/ViewingHistory';
import CustomerSupportPage from './components/user/CustomerSupportPage';

// 관리자 페이지
import AdminPage from './components/admin/AdminPage';
import AdministratorManagement from './components/admin/AdministratorManagement';
import DistributorManagement from './components/admin/DistributorManagement';
import NoticePage from './components/admin/NoticePage';
import ContentUploadPage from './components/admin/ContentUploadPage';
import ContentManagementPage from './components/admin/ContentManagementPage';
import UserManagementPage from './components/admin/UserManagementPage';

// 로그인/회원가입
import LoginPage from './components/LoginPage';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Routes>

        {/* 로그인 & 회원가입 (레이아웃 없이 단독) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* 사용자 페이지 - UserLayout으로 감싸기 */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<MainPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="viewing-history" element={<ViewingHistory />} />
          <Route path="customersupport" element={<CustomerSupportPage />} />
        </Route>

        {/* 관리자 페이지 - AdminLayout으로 감싸기 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="administrator" element={<AdministratorManagement />} />
          <Route path="distributor" element={<DistributorManagement />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="upload" element={<ContentUploadPage />} />
          <Route path="manage" element={<ContentManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
