import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://coltable-be.onrender.com/api/v1",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith("/auth")) return config;
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
