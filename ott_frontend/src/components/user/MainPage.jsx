import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const API_KEY = '2f5c97cc40ba5af58ab61f419406164e';
const BASE_URL = 'https://api.themoviedb.org/3';

// 성인 콘텐츠 필터링 키워드 및 장르
const ADULT_KEYWORDS = /(노출|섹스|불륜|욕망|배달|정사|야한|비디오|사모|성인|가슴|유혹|자위|몸종|애무|새엄마|노예)/i;
const EXCLUDED_GENRES = [10749]; // 로맨스 장르

function MainPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [isAdultVerified, setIsAdultVerified] = useState(false);

  const filterContent = (items) =>
      items.filter((item) => {
        const title = (item.title || item.name || '').toLowerCase();
        if (!item.poster_path) return false;
        if (!isAdultVerified) {
          if (item.adult) return false;
          if (ADULT_KEYWORDS.test(title)) return false;
          if (item.genre_ids?.some((id) => EXCLUDED_GENRES.includes(id))) return false;
        }
        return true;
      });

  useEffect(() => {
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_original_language=ko&include_adult=false`)
        .then((res) => res.json())
        .then((data) => setPopularMovies(filterContent(data.results).slice(0, 12)));
  }, [isAdultVerified]);

  useEffect(() => {
    fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_original_language=ko&include_adult=false`)
        .then((res) => res.json())
        .then((data) => setPopularTV(filterContent(data.results).slice(0, 12)));
  }, [isAdultVerified]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR&include_adult=false`)
        .then((res) => res.json())
        .then((data) => setLatestMovies(filterContent(data.results).slice(0, 12)));
  }, [isAdultVerified]);

  return (
      <>
        <div className="MainPage">
          {/* 메인 배너 */}
          <div className="popularities">
            <div className="main-banner" style={{ display: 'flex' }}>
              <img src="/images/movie/파묘2.jpg" alt="ott 사진" />
            </div>
          </div>

          {/* 인기 한국 영화 */}
          <div className="recommendations">
            <h3>인기 한국 영화</h3>
            <hr width="82%" align="left" />
            <div className="video-list">
              {popularMovies.map((movie) => (
                  <Link to={`/detail/movie/${movie.id}`} key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        title={movie.title}
                    />
                  </Link>
              ))}
            </div>
          </div>

          {/* 인기 TV */}
          <div className="watching">
            <h3>인기 한국 TV 프로그램</h3>
            <hr width="82%" align="left" />
            <div className="video-list">
              {popularTV.map((tv) => (
                  <Link to={`/detail/tv/${tv.id}`} key={tv.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                        alt={tv.name}
                        title={tv.name}
                    />
                  </Link>
              ))}
            </div>
          </div>

          {/* 최신 상영작 */}
          <div className="new-content">
            <h3>극장 상영 중인 한국 영화</h3>
            <hr width="82%" align="left" />
            <div className="video-list">
              {latestMovies.map((movie) => (
                  <Link to={`/detail/movie/${movie.id}`} key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        title={movie.title}
                    />
                  </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-socials">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <ul className="footer-links">
            <li>화면 해설</li><li>고객 센터</li><li>기프트카드</li>
            <li>미디어 센터</li><li>투자 정보(IR)</li><li>입사 정보</li>
            <li>이용 약관</li><li>개인정보</li><li>법적 고지</li>
            <li>쿠키 설정</li><li>회사 정보</li><li>문의하기</li>
          </ul>
          <div className="footer-code-box">
            <button className="service-code">서비스 코드</button>
          </div>
          <div className="footer-info">
            <p>아이씨네마 유한회사 통신판매업신고번호: 제2018-서울종로-0426호</p>
            <p>대표: 레지널드 숀 톰프슨 | 이메일: korea@icnema.com</p>
            <p>주소: 서울 종로구 우정국로 26, 센트로폴리스 A동 20층</p>
          </div>
        </footer>
      </>
  );
}

export default MainPage;
