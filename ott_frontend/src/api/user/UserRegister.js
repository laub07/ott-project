import axios from 'axios';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/register', formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || '회원가입 실패',
    };
  }
};
