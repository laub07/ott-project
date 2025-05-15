import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api/user';

export const loginUser = async (id, password) => {
  try {
    const response = await axios.post(USER_API_BASE_URL, {
      id,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('사용자 로그인 오류:', error);
    return { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
  }
};
