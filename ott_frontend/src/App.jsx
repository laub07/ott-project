import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './components/PrivateRoute';

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
  const token = sessionStorage.getItem("Authorization"); // ✅ 로그인 여부 확인

  return (
      <Router>
        <Routes>

          {/* 로그인 & 회원가입은 로그인 없이 접근 가능 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* 사용자 페이지 - 로그인된 경우에만 UserLayout 사용 */}
          <Route path="/" element={
            <PrivateRoute authenticated={!!token} component={<UserLayout />} />
          }>
            <Route index element={<MainPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="viewing-history" element={<ViewingHistory />} />
            <Route path="customersupport" element={<CustomerSupportPage />} />
          </Route>

          {/* 관리자 페이지 - 로그인된 경우에만 AdminLayout 사용 */}
          <Route path="/admin" element={
            <PrivateRoute authenticated={!!token} component={<AdminLayout />} />
          }>
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
