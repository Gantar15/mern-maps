import axios from 'axios';
import { AuthResponse } from '../types/AuthResponse';

export const API_URL = 'http://localhost:7000/api/';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

axiosInstance.interceptors.response.use(config => {
    return config;
}, async error => {
    if(error.response.status === 401){
        try{
            const response = await axios.get<AuthResponse>(API_URL + 'users/refresh', {
                withCredentials: true
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return axios.request(error.config);
        } catch(e){
            console.log('Пользователь не авторизован');
        }
    }
    else 
        throw error;
});

export default axiosInstance;