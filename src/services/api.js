import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 회원가입 API
export const registerUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/users/signup', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data; // 성공적인 응답 처리
    } catch (error) {
        throw error.response.data; // 에러 처리
    }
};

// 로그인 API
export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/users/login', credentials);
        return response.data; // 로그인 토큰 반환
    } catch (error) {
        throw error.response.data; // 에러 처리
    }
};

// 캠페인 목록 조회 API
export const fetchCampaigns = async () => {
    try {
        const response = await axiosInstance.get('/campaigns');
        return response.data; // 캠페인 목록 반환
    } catch (error) {
        throw error.response.data; // 에러 처리
    }
};

export const logoutUser = async () => {
  // 쿠키에서 토큰 제거
  Cookies.remove('Authorization');
};

export const getUserInfo = async () => {
  const token = Cookies.get('Authorization');

  try {
      const response = await axiosInstance.get(`${API_BASE_URL}/users/profile`, {
          headers: {
              Authorization: token
          }
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const updateUserInfo = async (userInfo) => {
  const token = Cookies.get('Authorization');

  try {
      const response = await axiosInstance.post(`${API_BASE_URL}/users/profile`, userInfo, {
          headers: {
              Authorization: token, 'Content-Type': 'multipart/form-data'
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};

