import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // URL вашего API

// Функция для получения токена из локального хранилища
const getToken = () => {
  return localStorage.getItem("access_token");
};

// Создание экземпляра axios с настройками
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавление токена в заголовки всех запросов
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const getPurchases = async () => {
  try {
    const response = await axiosInstance.get("/api/cart/");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении покупок:", error);
    return [];
  }
};
