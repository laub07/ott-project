import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';
import CategoryPage from './components/CategoryPage';
import AdministratorManagement from './components/AdministratorManagement';
import DistributorManagement from './components/DistributorManagement';
import NoticePage from './components/NoticePage';
import ViewingHistory from './components/ViewingHistory';
import ContentUploadPage from './components/ContentUploadPage';
import ContentManagementPage from './components/ContentManagementPage';
import AdminPage from './components/AdminPage';
import register from './components/register'; // ✅ 소문자 import
import CustomerSupportPage from './components/CustomerSupportPage';
import UserManagementPage from './components/UserManagementPage';
const Register = register;

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

    const handleLogin = () => {
        console.log("✅ 로그인 성공!");
        setIsLoggedIn(true); // 필요 시 상태 활용 가능
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('데이터를 가져오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/administrator-management" element={<AdministratorManagement />} />
                    <Route path="/distributor-management" element={<DistributorManagement />} />
                    <Route path="/notice" element={<NoticePage />} />
                    <Route path="/viewing-history" element={<ViewingHistory />} />
                    <Route path="/content-upload" element={<ContentUploadPage />} />
                    <Route path="/content-management" element={<ContentManagementPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/customersupport" element={<CustomerSupportPage />} />
                    <Route path="/userManagement" element={<UserManagementPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
