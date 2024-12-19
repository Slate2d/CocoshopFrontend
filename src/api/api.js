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
    const response = await axiosInstance.get("/api/cart-items/");
    console.log("Purchases:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении покупок:", error);
    return [];
  }
};
export const getFavourites = async () => {
  try {
    const response = await axiosInstance.get("/api/favourites/");
    console.log("Favourite:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении избранных товаров:", error);
    return [];
  }
};
export const addToCart = async (data) => {
  try {
    const response = await axiosInstance.post("/api/add-to-cart/", data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в корзину:", error);
    throw error;
  }
};

export const addToFavourites = async (data) => {
  try {
    const response = await axiosInstance.post("/api/add-to-favourites/", data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
    throw error;
  }
};
export const deleteFromCart = async (data) => {
  try {
    const response = await axiosInstance.post("/api/delete-from-cart/", data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в корзину:", error);
    throw error;
  }
};

export const removeFromFavourites = async (data) => {
  try {
    const response = await axiosInstance.post("/api/remove-from-favourites/", data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
    throw error;
  }
};