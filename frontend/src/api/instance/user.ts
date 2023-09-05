import axios from "axios";
import { SERVER_BASE_URL } from "../../constants";

export const api = axios.create({
  baseURL: SERVER_BASE_URL,
  // timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
