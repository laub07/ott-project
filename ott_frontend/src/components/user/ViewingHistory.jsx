import React, { useEffect, useState } from 'react';
import './ViewingHistory.css';

const ViewingHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const mockData = [
            { title: '선재 업고 튀어 1화', url: '/images/drama/선업튀시청1.jpg', date: '2024-07-07T15:30:00Z' },
            { title: '선재 업고 튀어 5화', url: '/images/drama/선업튀시청2.jpg', date: '2024-09-07T15:30:00Z' },
            { title: '슬기로운 의사생활 3화', url: '/images/drama/슬의생시청1.webp', date: '2024-09-07T19:00:00Z' },
            { title: '슬기로운 의사생활 4화', url: '/images/drama/슬의생시청2.jpg', date: '2024-09-07T19:00:00Z' },
            { title: '슬기로운 의사생활 5화', url: '/images/drama/슬의생시청3.webp', date: '2024-09-07T19:00:00Z' },
            { title: '중증외상센터 1화', url: '/images/drama/중증시청1.jpg', date: '2024-10-07T19:00:00Z' },
            { title: '중증외상센터 2화', url: '/images/drama/중증시청2.jpg', date: '2024-10-07T19:00:00Z' },
        ];
        setHistory(mockData);
    }, []);

    return (
        <div className="viewing-history-main-content">
            <h2>시청 기록</h2>
            <div className="grid-container">
                {history.map((item, index) => (
                    <div className="grid-item" key={index}>
                        <img
                            src={item.url}
                            alt={item.title}
                            className="thumbnail"
                        />
                        <div className="grid-item-content">
                            <h3>{item.title}</h3>
                            <p>시청 날짜: {new Date(item.date).toLocaleDateString('ko-KR')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewingHistory;
