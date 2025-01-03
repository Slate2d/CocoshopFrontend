import axios from "axios";

const API_BASE_URL = "http://192.168.31.177:8000";

const getToken = () => localStorage.getItem("access_token");

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true // This is important for CSRF
});

// Add request interceptor to handle authorization
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Get CSRF token from cookie
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
    
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  
  return config;
});

// Update createOrderFromCart to use axios instance
export const createOrderFromCart = async (orderData) => {
  try {
    const response = await api.post('/api/orders/create_from_cart/', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
// Add this to api.js
export const getProducts = async () => {
  try {
    const response = await api.get('/api/products/');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// Add request interceptor to handle authorization
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPurchases = async () => {
  try {
    const response = await api.get('/api/cart-items/');
    return response.data;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
};

export const getFavourites = async () => {
  try {
    const response = await api.get('/api/favourites/');
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addToCart = async (id) => {
  try {
    const response = await api.post(`/api/add-to-cart/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const addToFavourites = async (id) => {
  try {
    const response = await api.post(`/api/add-to-favourites/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const deleteAllFromCart = async (id) => {
  try {
    const response = await api.post(`/api/delete-all-from-cart/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const removeFromFavourites = async (id) => {
  try {
    const response = await api.post(`/api/remove-from-favourites/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const checkFavourites = async (id) => {
  try {
    const response = await api.get(`/api/check-favourites/${id}`);
    return {
      isFavourite: response.data?.isFavourite ?? false
    };
  } catch (error) {
    console.error("Error checking favorites:", error);
    return { isFavourite: false };
  }
};

export const checkCart = async (id) => {
  try {
    const response = await api.get(`/api/check-cart/${id}`);
    return {
      isInCart: response.data?.isInCart ?? false
    };
  } catch (error) {
    console.error("Error checking cart:", error);
    return { isInCart: false };
  }
};
function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('csrftoken=')) {
      return cookie.substring('csrftoken='.length, cookie.length);
    }
  }
  return null;
}

