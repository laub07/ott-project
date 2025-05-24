import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ userAuthentication = true, adminOnly = false }) {
    const token = sessionStorage.getItem('Authorization');
    const role = sessionStorage.getItem('Role');
    const isLogin = !!token;


    if (userAuthentication) {
        if (!isLogin) {
            return <Navigate to="/login" replace />;
        }
        // 로그인했지만 관리자만 접근 가능한 페이지일 경우
        if (adminOnly && role !== 'ADMIN') {
            alert("관리자 전용 페이지입니다.");
            return <Navigate to="/" replace />;
        }
        return <Outlet />;
    }

    // 비회원만 접근 가능한 페이지
    if (!userAuthentication && isLogin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
