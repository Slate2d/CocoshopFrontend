import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const NormalProduct = ({ imgSrc, altText, productName, price, oldPrice, rating, id, isInitiallyInCart = false }) => {
  const [isInCart, setIsInCart] = useState(isInitiallyInCart);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const handleProductClick = (e) => {
    // Prevent navigation if clicking on cart or favorite buttons
    if (e.target.closest('.button-container')) {
      return;
    }
    window.location.href = `/product/${id}`;
  };
  useEffect(() => {
    let isMounted = true;


    const loadProductState = async () => {
      if (!localStorage.getItem('access_token')) {
        return;
      }

      try {
        setIsLoading(true);
        const [cartResponse, favouriteResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/check-cart/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Accept': 'application/json'
            }
          }),
          fetch(`http://localhost:8000/api/check-favourites/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Accept': 'application/json'
            }
          })
        ]);

        if (!isMounted) return;

        if (!cartResponse.ok || !favouriteResponse.ok) {
          throw new Error('Failed to fetch product state');
        }

        const [cartData, favouriteData] = await Promise.all([
          cartResponse.json(),
          favouriteResponse.json()
        ]);

        if (isMounted) {
          setIsInCart(cartData.isInCart);
          setIsFavourite(favouriteData.isFavourite);
          setIsInitialized(true);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load product state");
          console.error("Error loading product state:", err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProductState();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCartClick = async () => {
    if (isLoading || !localStorage.getItem('access_token')) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/${isInCart ? 'delete-all-from-cart' : 'add-to-cart'}/${id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      setIsInCart(!isInCart);
      window.dispatchEvent(new CustomEvent('cartUpdate'));
    } catch (err) {
      setError("Failed to update cart");
      console.error("Error updating cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavouriteClick = async () => {
    if (isLoading || !localStorage.getItem('access_token')) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/${isFavourite ? 'remove-from-favourites' : 'add-to-favourites'}/${id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      setIsFavourite(!isFavourite);
      window.dispatchEvent(new CustomEvent('favouritesUpdate'));
    } catch (err) {
      setError("Failed to update favorites");
      console.error("Error updating favorites:", err);
    } finally {
      setIsLoading(false);
    }
  };

      
 return (
  <div className="product-card">
    <div className="product-link cursor-pointer" onClick={handleProductClick}>
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
              `$${price}`
            )}
          </span>
        )}
      </div>
    </div>
    
    {error && <div className="error-message">{error}</div>}
    
    <div className="button-container">
        <button
          className={`icon-button cart-button ${isInCart && isInitialized ? 'active' : ''}`}
          onClick={handleCartClick}
          disabled={isLoading || !isInitialized}
          aria-label={isInCart ? 'Remove from Cart' : 'Add to Cart'}
        >
          {isLoading ? (
            <span className="loading">...</span>
          ) : (
            <ShoppingCart 
              className={`w-5 h-5 ${isInCart && isInitialized ? 'fill-current' : ''}`}
            />
          )}
        </button>
        <button
          className={`icon-button favourite-button ${isFavourite && isInitialized ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          disabled={isLoading || !isInitialized}
          aria-label={isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          {isLoading ? (
            <span className="loading">...</span>
          ) : (
            <Heart 
              className={`w-5 h-5 ${isFavourite && isInitialized ? 'fill-current' : ''}`}
            />
          )}
        </button>
    </div>
  </div>
);
};


export default NormalProduct;