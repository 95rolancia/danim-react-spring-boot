import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  timeout: 1000,
});
