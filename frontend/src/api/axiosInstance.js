import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend URL
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// Add interceptors if needed (e.g., for token)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // Get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export default axiosInstance;
