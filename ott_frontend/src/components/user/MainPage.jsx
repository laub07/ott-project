// src/components/user/MainPage.jsx

import React from 'react';
import './MainPage.css';

function MainPage() {
  return (
  <>
    <div className="MainPage">


      <div className="popularities">
        <div className="main-content" style={{ display: 'flex' }}>
          <img src="/images/movie/파묘2.jpg" alt="ott 사진" />
        </div>
      </div>

      <div className="recommendations">
        <h3>오늘의 Top 20</h3>
        <hr width="82%" align="left" />
        <div className="video-list" style={{ display: 'flex' }}>
          <img src="/images/drama/선재업고튀어.webp" alt="ott 사진" />
          <img src="/images/drama/폭싹 속았수다.webp" alt="ott 사진" />
          <img src="/images/drama/옥씨부인전.webp" alt="ott 사진" />
          <img src="/images/drama/겟마을 차차차.webp" alt="ott 사진" />
          <img src="/images/drama/시그널.webp" alt="ott 사진" />
          <img src="/images/movie/파묘.jpg" alt="ott 사진" />
          <img src="/images/entertainment/환승연애2.jpg" alt="ott 사진" />
          <img src="/images/entertainment/하트시그널.webp" alt="ott 사진" />
          <img src="/images/drama/신병.jpg" alt="ott 사진" />
          <img src="/images/drama/중증외상센터.jpg" alt="ott 사진" />
          <img src="/images/drama/여신강림.jpg" alt="ott 사진" />
          <img src="/images/drama/남자친구.jpg" alt="ott 사진" />
          <img src="/images/drama/오 나의 귀신님.jpg" alt="ott 사진" />
          <img src="/images/drama/슬기로운 의사생활.webp" alt="ott 사진" />
        </div>
      </div>

      <div className="watching">
        <h3>시청 중인 콘텐츠</h3>
        <hr width="82%" align="left" />
        <div className="video-list" style={{ display: 'flex' }}>
          <img src="/images/drama/슬기로운 의사생활.webp" alt="ott 사진" />
          <img src="/images/drama/중증외상센터.jpg" alt="ott 사진" />
          <img src="/images/drama/신병.jpg" alt="ott 사진" />
          <img src="/images/drama/옥씨부인전.webp" alt="ott 사진" />
        </div>
      </div>

      <div className="new-content">
        <h3>새 콘텐츠 목록</h3>
        <hr width="82%" align="left" />
        <div className="video-list" style={{ display: 'flex' }}>
          <img src="/images/movie/독친.jpg" alt="ott 사진" />
          <img src="/images/entertainment/신서유기.png" alt="ott 사진" />
          <img src="/images/entertainment/부산촌놈.jpg" alt="ott 사진" />
          <img src="/images/entertainment/런닝맨.webp" alt="ott 사진" />
          <img src="/images/movie/소방관.webp" alt="ott 사진" />
          <img src="/images/movie/승부.webp" alt="ott 사진" />
          <img src="/images/movie/히트맨.jpg" alt="ott 사진" />
          <img src="/images/movie/탈주.jpg" alt="ott 사진" />
          <img src="/images/drama/신병.jpg" alt="ott 사진" />
          <img src="/images/movie/탈출.jpg" alt="ott 사진" />
          <img src="/images/movie/서울의 봄.webp" alt="ott 사진" />
          <img src="/images/drama/오징어게임2.webp" alt="ott 사진" />
        </div>
      </div>
    </div>
       {/* ✅ Footer는 바깥에 따로 */}
              <footer className="footer">
                <div className="footer-socials">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-youtube"></i>
                </div>
                <ul className="footer-links">
                  <li>화면 해설</li>
                  <li>고객 센터</li>
                  <li>기프트카드</li>
                  <li>미디어 센터</li>
                  <li>투자 정보(IR)</li>
                  <li>입사 정보</li>
                  <li>이용 약관</li>
                  <li>개인정보</li>
                  <li>법적 고지</li>
                  <li>쿠키 설정</li>
                  <li>회사 정보</li>
                  <li>문의하기</li>
                </ul>
                <div className="footer-code-box">
                  <button className="service-code">서비스 코드</button>
                </div>
                <div className="footer-info">
                  <p>아이씨네마 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)</p>
                  <p>대표: 레지널드 숀 톰프슨 | 이메일 주소: korea@icnema.com</p>
                  <p>주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161</p>
                  <p>사업자등록번호: 165-87-00119</p>
                  <p>클라우드 호스팅: Amazon Web Services Inc.</p>
                  <p>공정거래위원회 웹사이트</p>
                </div>
              </footer>
              </>
  );
}

export default MainPage;
