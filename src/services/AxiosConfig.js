import axios from 'axios';

const API_BASE_URL = 'https://www.voicefinder.kr/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
