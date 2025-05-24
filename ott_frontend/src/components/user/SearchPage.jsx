import React, { useState } from 'react';
import './SearchPage.css';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const mockData = [
        { title: '더 글로리' },
        { title: '서울의 봄' },
        { title: '범죄도시' },
        { title: '파묘' },
        { title: '극한직업' }
    ];

    const handleSearch = () => {
        const filtered = mockData.filter(item =>
            item.title.includes(query)
        );
        setResults(filtered);
    };

    return (
        <div className="search-container">
            <h2>OTT 콘텐츠 검색</h2>

            {/* ✅ 수평 정렬을 위한 div */}
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            <div className="search-results">
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchPage;
