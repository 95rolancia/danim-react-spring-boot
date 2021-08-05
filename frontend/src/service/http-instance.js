import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 403) {
      const originalRequest = config;
      console.log('엑세스 토큰 만료', error);
      await instance.post(`/silent-refresh`);
      // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);
