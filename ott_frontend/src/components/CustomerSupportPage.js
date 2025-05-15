import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './CustomerSupportPage.css';

const CustomerSupportPage = () => {
    const [activeTab, setActiveTab] = useState('faq');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfileMenu(prev => !prev);
    };

    const logout = () => {
        alert('로그아웃 되었습니다.');
        // 실제 로그아웃 처리 로직 추가 필요
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'faq':
                return (
                    <div className="support-content">
                        <h2>자주 묻는 질문 (FAQ)</h2>
                        <ul>
                            <li>Q. 비밀번호를 잊었어요. 어떻게 해야 하나요?</li>
                            <li>Q. 결제 내역은 어디서 확인하나요?</li>
                            <li>Q. 영상이 재생되지 않아요.</li>
                        </ul>
                    </div>
                );
            case 'bug':
                return (
                    <div className="support-content">
                        <h2>버그 신고</h2>
                        <p>버그나 오류가 발생하였나요?  아래 양식을 작성해주세요.</p>
                        <form>
                            <div className="input-group">
                                <label>제목</label>
                                <input type="text" placeholder="제목을 입력하세요" />
                            </div>
                            <div className="input-group">
                                <label>내용</label>
                                <textarea placeholder="버그 내용을 자세히 작성해주세요"></textarea>
                            </div>
                            <button className="btn-submit">제출하기</button>
                        </form>
                    </div>
                );
            case 'guide':
                return (
                    <div className="support-content">
                        <h2>이용 가이드</h2>
                        <p>OTT 플랫폼을 처음 사용하시나요? 아래 가이드를 참고하세요.</p>
                        <ul>
                            <li>회원가입 및 로그인 방법</li>
                            <li>프로필 설정 및 자녀 보호 기능</li>
                            <li>디바이스별 앱 설치 안내</li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="customer-support-page">
            <header>
                <div className="container">
                    <button className="menu-button">☰</button>
                    <img src="/images/로고.png" alt="로고" title="로고" />
                    <nav>
                        <ul>
                            <li className="active"><a href="/main">홈</a></li>
                            <li><a href="#">검색</a></li>
                            <li><a href="/notice">고객지원</a></li>
                            <li><a href="#">|</a></li>
                            <li className="profile" onClick={toggleProfileMenu}>
                                <img src="/images/프로필 사진.png" alt="프로필" className="profile-image" />
                                <a href="#">프로필 관리</a>
                                {showProfileMenu && (
                                    <div className="profile-dropdown">
                                        <div className="profile-info">
                                            <img src="/images/프로필 사진.png" alt="프로필" />
                                            <div>
                                                <strong>회원1</strong>
                                                <div className="sub">프로필 전환 &gt; </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul>
                                            <li>MY</li>
                                            <li>고객센터</li>
                                            <li onClick={logout}>로그아웃</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="support-tabs">
                <button onClick={() => setActiveTab('faq')} className={activeTab === 'faq' ? 'active' : ''}>FAQ</button>
                <button onClick={() => setActiveTab('bug')} className={activeTab === 'bug' ? 'active' : ''}>버그 신고</button>
                <button onClick={() => setActiveTab('guide')} className={activeTab === 'guide' ? 'active' : ''}>이용 가이드</button>
            </div>

            <div className="support-content-wrapper">
                {renderContent()}
            </div>
        </div>
    );
};

export default CustomerSupportPage;