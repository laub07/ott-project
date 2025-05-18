// src/components/admin/AdminPage.js

import React from 'react';
import './AdminPage.css';

function AdminPage() {
    const top20Images = [
        "/images/drama/선재업고튀어.webp",
        "/images/drama/폭싹 속았수다.webp",
        "/images/drama/옥씨부인전.webp",
        "/images/drama/겟마을 차차차.webp",
        "/images/drama/시그널.webp",
        "/images/movie/파묘.jpg",
        "/images/entertainment/환승연애2.jpg",
        "/images/entertainment/하트시그널.webp",
        "/images/drama/신병.jpg",
        "/images/drama/중증외상센터.jpg",
        "/images/drama/여신강림.jpg",
        "/images/drama/남자친구.jpg",
        "/images/drama/오 나의 귀신님.jpg",
        "/images/drama/슬기로운 의사생활.webp"
    ];

    return (
        <div className="admin-main-content">
            <div className="recommendations">
                <h3>최근에 업로드한 영상</h3>
                <hr width="82%" align="left" />
                <div className="video-list-scroll">
                    {top20Images.map((src, index) => (
                        <div className="video-item" key={index}>
                            <div className="video-thumb">
                                <img src={src} alt={`ott 사진 ${index + 1}`} />
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
