import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component }) => {
    const location = useLocation();

    if (!authenticated) {
        window.alert("로그인이 필요합니다.");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return Component;
};

export default PrivateRoute;
