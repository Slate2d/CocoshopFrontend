import React, { useState, useEffect } from "react";
import { getPurchases } from "../api/api";
import "./../css/shoppingCartStyle.css";
import "../css/product.css"

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const purchases = await getPurchases();
        setCartItems(purchases || []);
      } catch (err) {
        setError("Не удалось загрузить данные корзины.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

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
      <h1>Корзина</h1>
      <div className="cart-grid">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            <img
                src={item.product_image || "https://drive.google.com/uc?export=view&id=1Y2CDkTcz6-bq3Cyj3FaUy6VFo-UM7zN2"}
                alt={item.product_name}
              className="cart-card-image"
            />
            <div className="cart-card-details">
              <h2>{item.product_name}</h2>
              <p>Цена: {item.price} руб.</p>
              <p>Количество: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
