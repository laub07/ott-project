import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ userAuthentication }) {
    const token = sessionStorage.getItem('Authorization');
    const isLogin = !!token;

    if (userAuthentication) {
        return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
    } else {
        return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
    }
}

