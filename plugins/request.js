import axios from 'axios'
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io',
    timeout: 60000,
});

export default function ({ store, redirect }) {
    // 添加请求拦截器
    request.interceptors.request.use(function (config) {
        if (store.state.user) {
            config.headers.Authorization = `Token ${store.state.user.token}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    // 添加响应拦截器
    request.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (!store.state.user && error.response.status === 401) {
            redirect('/login');
        }
        return Promise.reject(error);
    });
}