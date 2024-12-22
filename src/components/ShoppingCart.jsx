import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getPurchases } from "../api/api";
import "./../css/shoppingCartStyle.css";
import "../css/product.css";
import NormalProduct from "./NormalProduct";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const purchases = await getPurchases();
        const items = purchases.map(({ product_id, product_name, product_price, quantity, product_brand, product_category, product_image }) => {
          return <NormalProduct 
            key={product_id} 
            id={product_id} 
            productName={product_name} 
            price={product_price} 
            quantity={quantity}
            imgSrc={product_image}
            isInitiallyInCart={true}
          />
        });
        
        // Calculate total price
        const total = purchases.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
        setTotalPrice(total);
        setCartItems(items);
      } catch (err) {
        setError("Не удалось загрузить данные корзины.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Но это никогда не поздно исправить :)</p>
        <a href="/" className="btn">Перейти в каталог</a>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-header">Корзина</h1>
      <div className="cart">
        {cartItems}
      </div>
      <div className="cart-summary">
        <div className="total-price">
          <h3>Итого:</h3>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          className="checkout-button"
          onClick={handleCheckout}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;