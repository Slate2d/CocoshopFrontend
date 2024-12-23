import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogIn, ShoppingCart, User } from 'lucide-react';
import SearchBar from './SearchBar';  // Import the new SearchBar component
import axios from 'axios';
const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const isAuthenticated = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  const updateCounts = async () => {
    try {
      // Fetch cart items count
      const cartResponse = await fetch('http://localhost:8000/api/cart-items/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Accept': 'application/json'
        }
      });
      const cartData = await cartResponse.json();
      setCartCount(cartData.length);

      // Fetch favourites count
      const favouritesResponse = await fetch('http://localhost:8000/api/favourites/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Accept': 'application/json'
        }
      });
      const favouritesData = await favouritesResponse.json();
      setFavouritesCount(favouritesData.length);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    updateCounts();

    // Listen for updates from product interactions
    window.addEventListener('cartUpdate', updateCounts);
    window.addEventListener('favouritesUpdate', updateCounts);
    
    return () => {
      window.removeEventListener('cartUpdate', updateCounts);
      window.removeEventListener('favouritesUpdate', updateCounts);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await axios.post('http://localhost:8000/api/logout/', {
        refresh_token: refreshToken
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      // Clear tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('chatRoomId'); // Add this line

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><h1>COCO SHOP</h1></Link>
      </div>
      
      <SearchBar />    
      <div className="icons">
      {isAuthenticated ? (
          <button onClick={handleLogout} className="auth-button logout-button">
            Выйти
          </button>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login-button">
              Войти
            </Link>
            <Link to="/register" className="auth-button register-button">
              Регистрация
            </Link>
          </div>
        )}
        {/* <Link to="/login">
        <LogIn />
        </Link>
        <Link to="/register">
        <User />
        </Link> */}
        <Link to="/liked" className="icon_wishlist_relative">
          <Heart className="w-6 h-6" />
          {favouritesCount > 0 && (
            <span className="wishSpan">
              {favouritesCount}
            </span>
          )}
        </Link>
        <Link to="/cart" className="icon_cart_relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="cartSpan">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;