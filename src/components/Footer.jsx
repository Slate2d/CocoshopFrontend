import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../css/stylemain.css";
import i18next from "../i18n";

const Footer = () => {
  const [activeEn, setActiveEn] = useState("false");
  const [activeRu, setActiveRu] = useState("false");

  const location = useLocation();

  useEffect(() => {
    switch (i18next.language.slice(0, 2)) {
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
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Левая часть */}
        <div className="footer-left">
          <a href="/">
            <h1>COCO SHOP</h1>
          </a>
        </div>

        {/* Центральная часть */}
        <div className="footer-center">
          <Link to="/liked" className="footer-btn">
            Избранное
          </Link>
          <Link to="/cart" className="footer-btn">
            Корзина
          </Link>
          <Link to="/contacts" className="footer-btn">
            Контакты
          </Link>
        </div>

        <div className="footer-right">
          <Link
            to="/terms"
            className={`footer-btn ${
              location.pathname === "/terms" ? "active" : ""
            }`}
          >
            Условия сервиса
          </Link>

          {/* Переключатель языка */}
          <div className="language">
            <button
              className={`footer-btn ${
                activeRu === "true" ? "active-lang" : ""
              }`}
              onClick={() => {
                changeLanguage("ru");
              }}
            >
              Рус
            </button>
            <button
              className={`footer-btn ${
                activeEn === "true" ? "active-lang" : ""
              }`}
              onClick={() => {
                changeLanguage("en");
              }}
            >
              Eng
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
