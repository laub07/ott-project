import React, { useState, useEffect } from 'react';
import './AdministratorManagement.css';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

function AdministratorManagement() {
    const [administrators, setAdministrators] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newAdmin, setNewAdmin] = useState({ adminId: '', email: '', password: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showGenres, setShowGenres] = useState({ management: false, support: false });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admins');
            console.log("불러온 관리자 목록:", response.data);
            setAdministrators(response.data);
            setFilteredAdmins(response.data);
        } catch (error) {
            console.error('관리자 목록 불러오기 실패:', error);
        }
    };

    const handleSearch = () => {
        setFilteredAdmins(
            administrators.filter(admin =>
                admin.adminId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                admin.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/admins', newAdmin);
            setNewAdmin({ adminId: '', email: '', password: '' });
            setShowAddForm(false);
            fetchAdmins(); // 목록 다시 불러오기
        } catch (error) {
            console.error('관리자 추가 실패:', error);
        }
    };

   const handleDelete = async (id) => {
       try {
           const response = await fetch(`http://localhost:8080/api/admins/${id}`, {
               method: 'DELETE'
           });

           if (response.ok) {
               fetchAdmins(); // 목록 새로고침
           } else {
               console.error('서버에서 삭제 실패 응답:', response.status);
           }
       } catch (error) {
           console.error('삭제 요청 오류:', error);
       }
   };


    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const navigateToCategory = (category) => {
        setShowGenres(prev => ({ ...prev, [category]: !prev[category] }));
    };

    return (
        <>
            <div className="admin-management">
                <h1>관리자 관리 페이지</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        placeholder="검색 창"
                    />
                    <button onClick={handleSearch} className="search-button">검색</button>
                    <button onClick={toggleAddForm} className="add-button">관리자 추가</button>
                </div>

                {showAddForm && (
                    <div className="admin-form-container">
                        <h2>새 관리자 추가</h2>
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            <input
                                type="text"
                                name="adminId"
                                placeholder="닉네임"
                                value={newAdmin.adminId}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일"
                                value={newAdmin.email}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={newAdmin.password}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <button type="submit" className="submit-button">추가</button>
                        </form>
                    </div>
                )}

                <div className="admin-table-container">
                    <span>총 관리자 수: {filteredAdmins.length}</span>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>관리자 번호</th>
                                <th>닉네임</th>
                                <th>이메일 주소</th>
                                <th>작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAdmins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.id}</td>
                                    <td>{admin.adminId}</td>
                                    <td>{admin.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(admin.id)}
                                            className="delete-button"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdministratorManagement;
