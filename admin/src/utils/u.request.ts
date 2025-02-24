import 'nprogress/nprogress.css';
import nProgress from 'nprogress';
import { ElMessage } from 'element-plus';
import { localStorageGet } from './u.localStorage';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

nProgress.configure({ showSpinner: false });

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true // 跨域请求携带 cookie
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    nProgress.start();

    // 设置 token
    const token: string | null = localStorageGet('token');
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (err: any): Promise<any> => {
    nProgress.done();
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res: AxiosResponse<any, any>): AxiosResponse<any, any> => {
    nProgress.done();
    return res;
  },
  (err: any): Promise<any> => {
    if (err.response.data.message === 'jwt expired') {
      ElMessage.error('登录已过期，请重新登录');
      nProgress.done();
      return Promise.reject(err);
    }

    if (err.response.data.message) {
      ElMessage.error(err.response.data.message);
    }

    nProgress.done();
    return Promise.reject(err);
  }
);

export default request;
