import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/product.css';
import { addToCart, deleteFromCart, addToFavourites, removeFromFavourites } from '../api/api';

const NormalProduct = ({ imgSrc, altText, productName, price, oldPrice, rating, id }) => {
  const [isInCart, setIsInCart] = useState(false); // состояние для корзины
  const [isFavourite, setIsFavourite] = useState(false); // состояние для избранного

  const handleCartClick = async () => {
    try {
      if (isInCart) {
        // Удаляем из корзины
        await deleteFromCart({ productId: id });
        setIsInCart(false);
        console.log("Товар удален из корзины");
      } else {
        // Добавляем в корзину
        await addToCart({ productId: id });
        setIsInCart(true);
        console.log("Товар добавлен в корзину");
      }
    } catch (error) {
      console.error("Ошибка при изменении состояния корзины:", error);
    }
  };

  const handleFavouriteClick = async () => {
    try {
      if (isFavourite) {
        // Удаляем из избранного
        await removeFromFavourites({ productId: id });
        setIsFavourite(false);
        console.log("Товар удален из избранного");
      } else {
        // Добавляем в избранное
        await addToFavourites({ productId: id });
        setIsFavourite(true);
        console.log("Товар добавлен в избранное");
      }
    } catch (error) {
      console.error("Ошибка при изменении состояния избранного:", error);
    }
  };

  return (
    <div className="product-card">
      <a href="#">
        <img className="product-image" src={imgSrc} alt={altText} />
        <p>{productName}</p>
        <div className="product-info">
          {rating && <span className="rating">{rating}</span>}
          {price && (
            <span className="price">
              {oldPrice ? (
                <>
                  <span className="sale">{price}</span> <span className="old-price">{oldPrice}</span>
                </>
              ) : (
                price
              )}
            </span>
          )}
        </div>
      </a>
      <div className="button-container">
        <button
          className={`cart-button ${isInCart ? 'active' : ''}`}
          onClick={handleCartClick}
        >
          {isInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        </button>
        <button
          className={`favourite-button ${isFavourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
        >
          {isFavourite ? 'Убрать из избранного' : 'Добавить в избранное'}
        </button>
      </div>
    </div>
  );
};

NormalProduct.propTypes = {
  imgSrc: PropTypes.string,
  altText: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
  oldPrice: PropTypes.string,
  rating: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default NormalProduct;
