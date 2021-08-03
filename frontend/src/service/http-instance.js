import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: 5000,
  withCredentials: true, 서버에서 CORS 처리해줘야 가능
});
