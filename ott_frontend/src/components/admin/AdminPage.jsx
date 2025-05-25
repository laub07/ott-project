import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
const BASE_URL = 'https://api.themoviedb.org/3';

function AdminPage() {
    const [topContents, setTopContents] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.results.filter(item => item.poster_path); // 포스터가 있는 것만
                setTopContents(filtered.slice(0, 14)); // 14개까지만
            })
            .catch(console.error);
    }, []);

    return (
        <div className="admin-main-content">
            <div className="recommendations">
                <h3>최근에 업로드한 영상</h3>
                <hr width="82%" align="left" />
                <div className="video-list-scroll">
                    {topContents.map((item, index) => (
                        <div className="video-item" key={index}>
                            <div className="video-thumb">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={item.title || item.name}
                                    title={item.title || item.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <br />

            <div className="additional-sections">
                <div className="notice-section">
                    <h4>공지사항</h4>
                    <hr width="100%" align="center" />
                    <ul>
                        <li>공지사항 1</li>
                        <li>공지사항 2</li>
                        <li>공지사항 3</li>
                        <li>공지사항 4</li>
                    </ul>
                </div>
                <div className="customer-inquiries-section">
                    <h4>고객문의</h4>
                    <hr width="100%" align="center" />
                    <ul>
                        <li>고객문의 1</li>
                        <li>고객문의 2</li>
                        <li>고객문의 3</li>
                        <li>고객문의 4</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
