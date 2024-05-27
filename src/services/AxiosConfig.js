import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
