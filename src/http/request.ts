import { WEBBASE_URL } from '@/configurations/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = WEBBASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('_X_AUTH_')
    
    if (token && !config.url?.includes("http")) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status } = error.response!;
        
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error('Unauthenticated');
                window.location.replace(WEBBASE_URL)
                break;

            case 404:
                console.error('Not-found');
                break;

            case 500:
                console.error('Server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
};

export default request;