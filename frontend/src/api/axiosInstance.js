import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed (e.g., for token)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
