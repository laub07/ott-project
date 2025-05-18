// src/components/admin/DistributorManagement.js
import React, { useState, useEffect } from 'react';
import './DistributorManagement.css';

function DistributorManagement() {
    const initialDistributors = [
        { id: 1, username: 'distributor1', email: 'distributor1@example.com' },
        { id: 2, username: 'distributor2', email: 'distributor2@example.com' },
        { id: 3, username: 'distributor3', email: 'distributor3@example.com' },
        { id: 4, username: 'distributor4', email: 'distributor4@example.com' },
        { id: 5, username: 'distributor5', email: 'distributor5@example.com' },
        { id: 6, username: 'distributor6', email: 'distributor6@example.com' }
    ];

    const [distributors, setDistributors] = useState(initialDistributors);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDistributor, setNewDistributor] = useState({ username: '', email: '', password: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [filteredDistributors, setFilteredDistributors] = useState(initialDistributors);

    useEffect(() => {
        handleSearch();
    }, [distributors, searchQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDistributor({ ...newDistributor, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newId = distributors.length > 0 ? Math.max(...distributors.map(d => d.id)) + 1 : 1;
        const updated = [...distributors, { ...newDistributor, id: newId }];
        setDistributors(updated);
        setNewDistributor({ username: '', email: '', password: '' });
        setShowAddForm(false);
    };

    const handleDelete = (id) => {
        setDistributors(distributors.filter(d => d.id !== id));
    };

    const handleSearch = () => {
        setFilteredDistributors(distributors.filter(d =>
            d.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.email.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    };

    return (
        <div className="admin-management">
            <h1>배포자 페이지</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    placeholder="검색 창"
                />
                <button onClick={handleSearch} className="search-button">검색</button>
                <button onClick={() => setShowAddForm(!showAddForm)} className="add-button">배포자 추가</button>
            </div>

            {showAddForm && (
                <form onSubmit={handleFormSubmit} className="admin-form">
                    <input
                        type="text"
                        name="username"
                        value={newDistributor.username}
                        onChange={handleInputChange}
                        placeholder="닉네임"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={newDistributor.email}
                        onChange={handleInputChange}
                        placeholder="이메일"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={newDistributor.password}
                        onChange={handleInputChange}
                        placeholder="비밀번호"
                        required
                    />
                    <button type="submit" className="submit-button">추가</button>
                </form>
            )}

            <div className="admin-table-container">
                <p>총 배포자 수: {filteredDistributors.length}</p>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDistributors.map(d => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.username}</td>
                                <td>{d.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(d.id)} className="delete-button">삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DistributorManagement;
