import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/user/UserLogin';
import './LoginPage.css';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(username, password);
    console.log("🔑 login response:", response); // 여기가 중요



    if (response.success) {
      sessionStorage.setItem('Authorization', response.token);
      sessionStorage.setItem('Role', response.role);
      setToken(response.token); // ✅ App.jsx와 연결된 token 상태 갱신

      if (response.role === 'ADMIN') {
        // ✅ 일단 navigate로 전환해서 콘솔 유지해보기
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(response.message || '로그인 실패');
    }
  };

  return (
      <div className="LoginPage">
        <div className="logo">
          <img src="/images/로고.png" alt="로고" title="로고" />
        </div>
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button className="login-btn" type="submit">로그인하기</button>

            <div className="btn-container">
              <Link to="/find-id" className="secondary-btn">아이디 찾기</Link>
              <span className="divider">|</span>
              <Link to="/find-password" className="secondary-btn">비밀번호 찾기</Link>
              <span className="divider">|</span>
              <Link to="/register" className="secondary-btn">회원가입</Link>
            </div>
          </form>
        </div>
      </div>
  );
}

export default LoginPage;
