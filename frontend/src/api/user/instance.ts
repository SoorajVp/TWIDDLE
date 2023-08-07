import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  // timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
