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
        const items = purchases.map(({ id, product, product_name, product_price, product_brand, product_category}) => {
          return <NormalProduct key={id} id={id} productName={product_name} price={product_price} quantity={1} />
        })
        setLikedItems(items);
      } catch (err) {
        setError("Не удалось загрузить данные избранных товаров.");
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
