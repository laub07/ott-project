import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ContentUploadPage.css';

const ContentUploadPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [cast, setCast] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleCastChange = (e) => {
        setCast(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const mockUpload = async (formData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: 'Mock upload successful!' });
            }, 2000);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('cast', cast);
        formData.append('file', file);

        try {
            // 실제 API 호출 대신 모킹된 업로드 함수 호출
            const response = await mockUpload(formData);
            setLoading(false);
            setModalMessage('파일 업로드 성공!');
            setShowModal(true);
            console.log('Mock Server Response:', response.data);
        } catch (error) {
            setLoading(false);
            setModalMessage('파일 업로드 실패.');
            setShowModal(true);
            console.error('Error uploading file:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`viewing-history ${sidebarOpen ? 'open' : ''}`}>
            <header>
                <div className="container">
                    <button className="menu-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <img src="/images/로고.png" alt="로고" title="로고" />
                    <nav>
                        <ul>
                            <li className="active"><a href="#">홈</a></li>
                            <li><a href="#">|</a></li>
                            <img src="/images/프로필 사진.png" alt="프로필" title="프로필" className="profile-image" />
                            <li className="profile"><a href="#">프로필 관리</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><Link to="/ContentManagement">| 콘텐츠 관리</Link></li>
                    <li><Link to="/ContentUpload">| 콘텐츠 업로드</Link></li>
                </ul>
            </div>
            <div className="content-upload-page">
                <h2>콘텐츠 업로드</h2>
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">장르</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={handleGenreChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cast">출연자</label>
                        <input
                            type="text"
                            id="cast"
                            value={cast}
                            onChange={handleCastChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">파일 업로드</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>업로드</button>
                    {loading && <p>업로드 중...</p>}
                </form>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <p>{modalMessage}</p>
                                <button onClick={handleCloseModal}>확인</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentUploadPage;
