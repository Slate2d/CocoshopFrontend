import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../css/stylemain.css";
import i18next from "../i18n"

const Footer = () => {
  const [activeEn, setActiveEn] = useState("false");
  const [activeRu, setActiveRu] = useState("false");
  

  useEffect(() => {
    switch (i18next.language.slice(0,2)) {
      case "en":
        localStorage.setItem("language", "en");
        setActiveEn("true");
        setActiveRu("false");
        break;
      case "ru":
        localStorage.setItem("language", "ru");
        setActiveRu("true");
        setActiveEn("false");
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18next.language]);

  const changeLanguage = (language) => {
    i18next.changeLanguage(language);
    window.location.reload();
  }

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <h1>COCO SHOP</h1>
        </div>
        <div className="footer-center">
          <Link to="/liked" className="footer-btn">Избранное</Link>
          <Link to="/cart" className="footer-btn">Корзина</Link>
          <Link to="/contacts" className="footer-btn">Контакты</Link>
        </div>
        <div className="footer-right">
          <button className="footer-btn">Условия сервиса</button>
          <div className="language">
            <button className={`footer-btn ${activeRu === "true" ? "active-lang" : ""}`} onClick={() => { changeLanguage("ru") }}>Рус</button>
            <button className={`footer-btn ${activeEn === "true" ? "active-lang" : ""}`} onClick={() => { changeLanguage("en") }}>Eng</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
