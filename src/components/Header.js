import React from "react";
import { Link } from "react-router-dom";
// import "./../css/stylemain.css"; // Общие стили для хедера

const Header = () => (
  <header className="header">
    <div className="logo">
      <h1>COCO SHOP</h1>
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
      <Link to="/liked" className="icon wishlist">
        <i className="heart-icon">&#9829;</i>
        <span className="badge">2</span>
      </Link>
      <Link to="/cart" className="icon cart">
        <i className="cart-icon">&#128722;</i>
        <span className="badge">1</span>
      </Link>
    </div>
  </header>
);

export default Header;
