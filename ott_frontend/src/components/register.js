// components/register.js
import { registerUser } from '../api/user/UserRegister';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        phone: '',
        isAdmin: false
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const requestBody = {
            userId: form.username,     // ✅ 사용자용
            adminId: form.username,
            password: form.password,
            passwordConfirm: form.passwordConfirm,
            email: form.email,
            phone: form.phone,
            role: form.isAdmin ? 'ADMIN' : 'USER'
        };

        try {
            // 추후 회원가입 API 연동 시 사용
            await registerUser(requestBody);
            console.log('회원가입 요청:', requestBody);
            navigate('/login');
        } catch (err) {
            setError('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="RegisterPage">
            <div className="logo">
                <img src="/images/로고.png" alt="로고" title="로고" />
            </div>
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">아이디</label>
                        <input type="text" name="username" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input type="password" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">휴대폰 번호</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                    </div>
                 <div className="form-group checkbox">
                   <label>
                     <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
                     관리자 계정으로 등록하겠습니다.
                   </label>
                 </div>

                    {error && <div className="error">{error}</div>}

                    <button className="register-btn" type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
