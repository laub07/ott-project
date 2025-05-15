import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

function UserManagementPage() {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newUser, setNewUser] = useState({ userId: '', email: '', password: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showGenres, setShowGenres] = useState({ management: false, support: false });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUserList(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('사용자 목록 불러오기 실패:', error);
        }
    };

    const handleSearch = () => {
        setFilteredUsers(
            userList.filter(user =>
                user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users', newUser);
            setNewUser({ userId: '', email: '', password: '' });
            setShowAddForm(false);
            fetchUsers();
        } catch (error) {
            console.error('사용자 추가 실패:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchUsers();
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
        <div className="admin-management">
            <h1>사용자 관리 페이지</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    placeholder="검색 창"
                />
                <button onClick={handleSearch} className="search-button">검색</button>
                <button onClick={toggleAddForm} className="add-button">사용자 추가</button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <h2>새 사용자 추가</h2>
                    <form onSubmit={handleFormSubmit} className="admin-form">
                        <input
                            type="text"
                            name="userId"
                            placeholder="닉네임"
                            value={newUser.userId}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={newUser.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <button type="submit" className="submit-button">추가</button>
                    </form>
                </div>
            )}

            <div className="admin-table-container">
                <span>총 사용자 수: {filteredUsers.length}</span>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>사용자 번호</th>
                            <th>닉네임</th>
                            <th>이메일 주소</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userId}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user.id)}
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
    );
}

export default UserManagementPage;
