import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentManagementPage.css';

const ContentManagementPage = () => {
  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [genreFilter, setGenreFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = [
      { id: 1, title: '인사이드 아웃', genre: '영화', cast: 'Amy Poehler', description: '애니메이션 영화', date: '2024-07-07' },
      { id: 2, title: '선재 업고 튀어', genre: '드라마', cast: 'Kim Soo Hyun', description: '드라마', date: '2024-07-07' },
      // ... 생략
    ];
    setContents(mockData);
  }, []);

  const handleDelete = (id) => {
    setContents(contents.filter(c => c.id !== id));
  };

  const handleRowClick = (content) => {
    setSelectedContent(content);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
  };

  const handleAddContent = () => {
    navigate('/admin/upload');
  };

  const filteredContents = contents.filter(content =>
    (!genreFilter || content.genre === genreFilter) &&
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-management-page">
      <h2>콘텐츠 관리</h2>

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색 창"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button>검색</button>
          <button onClick={handleAddContent}>콘텐츠 추가</button>
        </div>
      </div>

      <div className="filter-container">
        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="애니메이션">애니메이션</option>
          <option value="드라마">드라마</option>
          <option value="영화">영화</option>
        </select>
      </div>

      <div className="total-count-container">
        <p className="total-count">총 콘텐츠 수: {filteredContents.length}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>장르</th>
            <th>업로드 날짜</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {filteredContents.map(content => (
            <tr key={content.id} onClick={() => handleRowClick(content)}>
              <td>{content.title}</td>
              <td>{content.genre}</td>
              <td>{content.date}</td>
              <td>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(content.id); }}
                  className="delete-button"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <h3>{selectedContent.title}</h3>
              <p><strong>장르:</strong> {selectedContent.genre}</p>
              <p><strong>출연자:</strong> {selectedContent.cast}</p>
              <p><strong>설명:</strong> {selectedContent.description}</p>
              <p><strong>업로드 날짜:</strong> {selectedContent.date}</p>
              <button onClick={handleCloseModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagementPage;
