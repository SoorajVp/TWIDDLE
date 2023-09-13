import axios from "axios";
import { SERVER_BASE_URL } from "../../config";

export const api = axios.create({
  baseURL: SERVER_BASE_URL,
  // timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // Assuming you store the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
