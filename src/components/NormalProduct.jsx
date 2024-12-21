import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/product.css';
import { addToCart, deleteAllFromCart, addToFavourites, removeFromFavourites, checkFavourites, checkCart } from '../api/api';

const NormalProduct = ({ imgSrc, altText, productName, price, oldPrice, rating, id, isInitiallyInCart = false }) => {
  const [isInCart, setIsInCart] = useState(isInitiallyInCart);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductState = async () => {
      try {
        const [cartResponse, favouriteResponse] = await Promise.all([
          !isInitiallyInCart ? checkCart(id) : { isInCart: true },
          checkFavourites(id)
        ]);

        setIsInCart(cartResponse.isInCart);
        setIsFavourite(favouriteResponse.isFavourite);
      } catch (err) {
        setError("Failed to load product state");
        console.error("Error loading product state:", err);
      }
    };

    loadProductState();
  }, [id, isInitiallyInCart]);

  const handleCartClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (isInCart) {
        await deleteAllFromCart(id);
        setIsInCart(false);
      } else {
        await addToCart(id);
        setIsInCart(true);
      }
    } catch (err) {
      setError("Failed to update cart");
      console.error("Error updating cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavouriteClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (isFavourite) {
        await removeFromFavourites(id);
        setIsFavourite(false);
      } else {
        await addToFavourites(id);
        setIsFavourite(true);
      }
    } catch (err) {
      setError("Failed to update favorites");
      console.error("Error updating favorites:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-link">
        <img className="product-image" src={imgSrc} alt={altText || productName} />
        <p className="product-name">{productName}</p>
        <div className="product-info">
          {rating && <span className="rating">{rating}</span>}
          {price && (
            <span className="price">
              {oldPrice ? (
                <>
                  <span className="sale">{price}</span>
                  <span className="old-price">{oldPrice}</span>
                </>
              ) : (
                price
              )}
            </span>
          )}
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="button-container">
        <button
          className={`cart-button ${isInCart ? 'active' : ''}`}
          onClick={handleCartClick}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : (isInCart ? 'Remove from Cart' : 'Add to Cart')}
        </button>
        <button
          className={`favourite-button ${isFavourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : (isFavourite ? 'Remove from Favorites' : 'Add to Favorites')}
        </button>
      </div>
    </div>
  );
};

NormalProduct.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  oldPrice: PropTypes.string,
  rating: PropTypes.string,
  id: PropTypes.number.isRequired,
  isInitiallyInCart: PropTypes.bool
};

export default NormalProduct;