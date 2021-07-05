import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default axiosInstance;