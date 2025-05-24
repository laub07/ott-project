import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';

// 레이아웃
import UserLayout from './components/user/UserLayout';
import AdminLayout from './components/admin/AdminLayout';

// 사용자 페이지
import MainPage from './components/user/MainPage';
import FavoritesPage from './components/user/FavoritesPage';
import CategoryPage from './components/user/CategoryPage';
import ViewingHistory from './components/user/ViewingHistory';
import CustomerSupportPage from './components/user/CustomerSupportPage';
import SearchPage from './components/user/SearchPage'

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
  const [token, setToken] = useState(null);

  return (
      <Router>
        <Routes>
          {/* 로그인/회원가입 (비로그인 상태에서만 접근 가능) */}
          <Route element={<PrivateRoute userAuthentication={false} />}>
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Route>


          {/* 사용자 페이지 (로그인 상태면 누구든 접근 가능) */}
          <Route element={<PrivateRoute userAuthentication={true} />}>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<MainPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="viewing-history" element={<ViewingHistory />} />
              <Route path="customersupport" element={<CustomerSupportPage />} />
              <Route path="search" element={<SearchPage />} />
            </Route>
          </Route>

          {/* 관리자 전용 페이지 (관리자만 접근 가능) */}
          <Route element={<PrivateRoute userAuthentication={true} adminOnly={true} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
              <Route path="administrator" element={<AdministratorManagement />} />
              <Route path="distributor" element={<DistributorManagement />} />
              <Route path="notice" element={<NoticePage />} />
              <Route path="upload" element={<ContentUploadPage />} />
              <Route path="manage" element={<ContentManagementPage />} />
              <Route path="users" element={<UserManagementPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
