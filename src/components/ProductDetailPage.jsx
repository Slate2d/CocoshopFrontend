// Refactored ProductDetailPage Component
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import '../css/productDetailPage.css';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductId = () => {
    const path = window.location.pathname;
    const matches = path.match(/\/(\d+)/);
    return matches ? matches[1] : null;
  };

  useEffect(() => {
    const productId = getProductId();
    if (!productId) {
      setError('Invalid product ID');
      setIsLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);

        if (localStorage.getItem('access_token')) {
          const [cartResponse, favouriteResponse] = await Promise.all([
            fetch(`http://localhost:8000/api/check-cart/${productId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            }),
            fetch(`http://localhost:8000/api/check-favourites/${productId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            }),
          ]);

          const [cartData, favouriteData] = await Promise.all([
            cartResponse.json(),
            favouriteResponse.json(),
          ]);

          setIsInCart(cartData.isInCart);
          setIsFavourite(favouriteData.isFavourite);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  const handleCartClick = async () => {
    if (!localStorage.getItem('access_token')) return;
    const productId = getProductId();
    setIsLoading(true);

    try {
      const endpoint = isInCart ? 'delete-all-from-cart' : 'add-to-cart';
      const response = await fetch(`http://localhost:8000/api/${endpoint}/${productId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      if (!response.ok) throw new Error('Failed to update cart');
      setIsInCart(!isInCart);
    } catch {
      setError('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavouriteClick = async () => {
    if (!localStorage.getItem('access_token')) return;
    const productId = getProductId();
    setIsLoading(true);

    try {
      const endpoint = isFavourite ? 'remove-from-favourites' : 'add-to-favourites';
      const response = await fetch(`http://localhost:8000/api/${endpoint}/${productId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      if (!response.ok) throw new Error('Failed to update favourites');
      setIsFavourite(!isFavourite);
    } catch {
      setError('Failed to update favourites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <button onClick={handleBackClick} className="back-button">← Back</button>

      <div className="product-container">
        <img src={product.image_url} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {product.category.name}</p>
          <p className="product-brand">Brand: {product.brand.name}</p>

          <div className="button-group">
            <button
              onClick={handleCartClick}
              className={`action-button ${isInCart ? 'in-cart' : 'add-cart'}`}
            >
              <ShoppingCart className="icon" /> {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={handleFavouriteClick}
              className={`action-button ${isFavourite ? 'in-favourite' : 'add-favourite'}`}
            >
              <Heart className="icon" /> {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
