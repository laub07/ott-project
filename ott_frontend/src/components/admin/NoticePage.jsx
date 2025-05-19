// src/components/admin/NoticePage.jsx
import React, { useState } from 'react';
import './NoticePage.css';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addOrUpdateNotice = () => {
    if (titleInput.trim() && contentInput.trim()) {
      const newNotice = {
        id: editIndex !== null ? notices[editIndex].id : (notices.length ? notices[notices.length - 1].id + 1 : 1),
        title: titleInput.trim(),
        content: contentInput.trim(),
        date: editIndex !== null ? notices[editIndex].date : new Date().toLocaleDateString(),
        expanded: false,
      };

      if (editIndex !== null) {
        setNotices(notices.map((n, i) => (i === editIndex ? newNotice : n)));
        setEditIndex(null);
      } else {
        setNotices([...notices, newNotice]);
      }

      setTitleInput('');
      setContentInput('');
      setShowModal(false);
    }
  };

  const deleteNotice = (index) => {
    setNotices(notices.filter((_, i) => i !== index));
  };

  const editNotice = (index) => {
    setTitleInput(notices[index].title);
    setContentInput(notices[index].content);
    setEditIndex(index);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setTitleInput('');
      setContentInput('');
      setEditIndex(null);
    }
  };

  const toggleExpand = (index) => {
    setNotices(notices.map((notice, i) => (
      i === index ? { ...notice, expanded: !notice.expanded } : notice
    )));
  };

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatContent = (content) => {
    return content.split('\n').map((line, i) => <span key={i}>{line}<br /></span>);
  };

  return (
    <div className="notice-page">
      <div className="header">
        <h1>공지사항 관리</h1>
      </div>

      <div className="notice-list-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-search">검색</button>
          <button className="btn btn-primary" onClick={toggleModal}>공지사항 글쓰기</button>
        </div>
      </div>

      <div className="notice-list">
        {filteredNotices.length === 0 ? (
          <div className="no-notice">공지사항이 없습니다.</div>
        ) : (
          <table className="notice-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>날짜</th>
                <th className="action-column">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td onClick={() => toggleExpand(index)} className="notice-title">{notice.title}</td>
                    <td>{notice.date}</td>
                    <td className="action-column">
                      <button className="btn btn-warning" onClick={() => editNotice(index)}>수정</button>
                      <button className="btn btn-danger" onClick={() => deleteNotice(index)}>삭제</button>
                    </td>
                  </tr>
                  {notice.expanded && (
                    <tr>
                      <td colSpan="3" className="notice-content">
                        {formatContent(notice.content)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <h2>{editIndex !== null ? '공지사항 수정' : '공지사항 등록'}</h2>
            <div className="input-group">
              <label>제목</label>
              <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
            </div>
            <div className="input-group">
              <label>내용</label>
              <textarea value={contentInput} onChange={(e) => setContentInput(e.target.value)} />
            </div>
            <div className="modal-buttons">
              <button className="btn btn-modal-add" onClick={addOrUpdateNotice}>
                {editIndex !== null ? '수정' : '추가'}
              </button>
              <button className="btn btn-secondary" onClick={toggleModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticePage;
