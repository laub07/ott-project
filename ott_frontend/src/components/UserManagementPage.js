import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import axios from 'axios';

function UserManagementPage() {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
            </div>

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
