import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(config => {
    // URL에 따라 Content-Type 헤더를 동적으로 설정
    if (config.url.includes('/campaigns') && config.method === 'post') {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
