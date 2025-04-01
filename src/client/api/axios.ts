import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com"
    : "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // needed for cookies
});

export default axiosInstance;
