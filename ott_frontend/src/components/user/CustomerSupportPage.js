import React, { useState } from 'react';
import './CustomerSupportPage.css';

const CustomerSupportPage = () => {
    const [activeTab, setActiveTab] = useState('faq');

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
                        <p>버그나 오류가 발생하였나요? 아래 양식을 작성해주세요.</p>
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
