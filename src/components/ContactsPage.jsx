import React from 'react';
import '../css/ContactsPage.css'; // Подключаем стили

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <h2 className="contacts-title">Наш офис</h2>
      <div className="map-container">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaab90464b45eb8874b82284e18a74de814dcf2a526d925318f5aba60682539d4&amp;source=constructor"
          width="100%"
          height="579"
          frameborder="0"
        ></iframe>
      </div>
      <div className="address-container">
        <p>📍 ул. Безменовская, 52</p>
        <p>3 этаж, 35 кабинет</p>
        <p>📞 +375298391466</p>
      </div>
      <div className="social-buttons">
        <button className="social-btn">📞</button>
        <button className="social-btn">VK</button>
        <button className="social-btn">ТГ</button>
        <button className="social-btn">INST</button>
      </div>
    </div>
  );
};

export default ContactsPage;
