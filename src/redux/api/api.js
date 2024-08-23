import axios from 'axios';

export const baseURL = 'https://marathon-api.clevertec.ru';

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('JWT') || sessionStorage.getItem('JWTSession');
    const req = config;

    req.headers.Authorization = token ? `Bearer ${token}` : '';

    return req;
});
