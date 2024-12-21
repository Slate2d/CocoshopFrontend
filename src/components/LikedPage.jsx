import React, { useState, useEffect } from "react";
import { getFavourites } from "../api/api";
import "./../css/shoppingCartStyle.css";
import "../css/product.css"
import NormalProduct from "./NormalProduct";



const LikedPage = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const purchases = await getFavourites();
        const items = purchases.map(({ product_id, product_name, product_price, quantity, product_brand, product_category, product_image }) => {
          return <NormalProduct 
            key={product_id} 
            id={product_id} 
            productName={product_name} 
            price={product_price} 
            quantity={quantity}
            imgSrc={product_image}
            isInitiallyInCart={true} // Добавляем этот проп
          />
        });
        setLikedItems(items);
      } catch (err) {
        setError("Не удалось загрузить данные корзины.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="cart-container">
      <h1 className="cart-header">Избранное</h1>
      <div className="cart">
        {likedItems}
      </div>
    </div>
  );

}

export default LikedPage;
