import React, { useState, useEffect } from 'react';
import './DistributorManagement.css';
import { Link, NavLink } from 'react-router-dom';

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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showManagementGenres, setShowManagementGenres] = useState(false);
    const [showSupportGenres, setShowSupportGenres] = useState(false);

    useEffect(() => {
        handleSearch();
    }, [distributors, searchQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDistributor({ ...newDistributor, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDistributors(prevDistributors => {
            const newId = prevDistributors.length > 0 ? Math.max(...prevDistributors.map(distributor => distributor.id)) + 1 : 1;
            const updatedDistributors = [...prevDistributors, { ...newDistributor, id: newId }];
            setFilteredDistributors(updatedDistributors);  // Update filteredDistributors with new distributor
            return updatedDistributors;
        });
        setNewDistributor({ username: '', email: '', password: '' });
        setShowAddForm(false);  // Hide form after submission
    };

    const handleDelete = (distributorId) => {
        const updatedDistributors = distributors.filter(distributor => distributor.id !== distributorId);
        setDistributors(updatedDistributors);
    };

    const handleSearch = () => {
        setFilteredDistributors(distributors.filter(distributor =>
            distributor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            distributor.email.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleManagementGenres = () => {
        setShowManagementGenres(!showManagementGenres);
    };

    const toggleSupportGenres = () => {
        setShowSupportGenres(!showSupportGenres);
    };

    return (
        <>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <img src="/images/로고.png" alt="로고" title="로고" />
                    <nav>
                        <ul>
                            <li><NavLink exact to="/" activeClassName="active">홈</NavLink></li>
                            <li><a href="#">|</a></li>
                            <img src="/images/프로필 사진.png" alt="프로필" title="프로필" className="profile-image" />
                            <li className="profile"><a href="#">관리자 1</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><a href="#">|　내 정보 수정</a></li>
                    <li onClick={toggleManagementGenres}>
                        <a href="#">|　관리 페이지</a>
                    </li>
                    <div className={`genres ${showManagementGenres ? 'show' : ''}`}>
                        <ul>
                            <li><Link to="/AdministratorManagement">　　ㄴ 관리자 관리</Link></li>
                            <li><Link to="/DistributorManagement">　　ㄴ 배포자 관리</Link></li>
                        </ul>
                    </div>
                    <li onClick={toggleSupportGenres}>
                        <a href="#">|　고객지원</a>
                    </li>
                    <div className={`genres ${showSupportGenres ? 'show' : ''}`}>
                        <ul>
                            <li><a href="#">　　ㄴFQA </a></li>
                            <li><a href="#">　　ㄴ 버그신고</a></li>
                        </ul>
                    </div>
                    <hr width="85%" align="center" />
                    <li><Link to="/Notice">|　공지사항</Link></li>
                </ul>
            </div>

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
                    <button onClick={toggleAddForm} className="add-button">배포자 추가</button>
                </div>
                {showAddForm && (
                    <div className="admin-form-container">
                        <h2>새 배포자 추가</h2>
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            <input
                                type="text"
                                name="username"
                                placeholder="닉네임"
                                value={newDistributor.username}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일"
                                value={newDistributor.email}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={newDistributor.password}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            <button type="submit" className="submit-button">추가</button>
                        </form>
                    </div>
                )}
                <div className="admin-table-container">
                    <span>총 배포자 수: {filteredDistributors.length}</span>
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>배포자 번호</th>
                            <th>닉네임</th>
                            <th>이메일 주소</th>
                            <th>작업</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredDistributors.map(distributor => (
                            <tr key={distributor.id} className="admin-item">
                                <td>{distributor.id}</td>
                                <td>{distributor.username}</td>
                                <td>{distributor.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(distributor.id)} className="delete-button">삭제</button>
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

export default DistributorManagement;
