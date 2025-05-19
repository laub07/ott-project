// src/components/admin/ContentUploadPage.jsx

import React, { useState } from 'react';
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

  return (
    <div className="content-upload-page">
      <h2>콘텐츠 업로드</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="genre">장르</label>
          <input id="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="cast">출연자</label>
          <input id="cast" type="text" value={cast} onChange={(e) => setCast(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="file">파일 업로드</label>
          <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>업로드</button>
        {loading && <p>업로드 중...</p>}
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentUploadPage;
