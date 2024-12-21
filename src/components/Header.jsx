import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

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

  return (
    <header className="header">
      <div className="logo">
        <a href="/"><h1>COCO SHOP</h1></a>
      </div>
      <div className="SELECTOR">
        <i className="phone-icon">&#128241;</i>
        <select>
          <option value="">Выбрать модель телефона</option>
          <option value="1">Samsung</option>
          <option value="2">Poco</option>
          <option value="3">Lenovo</option>
        </select>
      </div>
      <div className="icons">
        <Link to="/liked" className="icon wishlist relative">
          <Heart className="w-6 h-6" />
          {favouritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {favouritesCount}
            </span>
          )}
        </Link>
        <Link to="/cart" className="icon cart relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;