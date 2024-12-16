import React from 'react';
import './../css/stylemain.css';
import '../css/product.css';
import png2 from '../images/2.jpg';
import { useTranslation } from 'react-i18next';
import CategoryProduct from '../components/CategoryProduct';
import NormalProduct from '../components/NormalProduct';

const MainPage = () => {
  const { t } = useTranslation();

  const cases = [
    {
      imgSrc: require('../images/10.jpg'),
      altText: 'Стеклянные Чехлы',
      productName: 'Стеклянные',
    },
    {
      imgSrc: require('../images/1.jpg'),
      altText: 'Силиконовые Чехлы',
      productName: 'Силиконовые',
    },
    {
      imgSrc: require('../images/3.jpg'),
      altText: 'Кожаные Чехлы',
      productName: 'Кожаные',
    },
  ];

  const headphones = [
    {
      imgSrc: require('../images/5.jpg'),
      altText: 'Apple BYZ S852I',
      productName: 'Apple BYZ S852I',
      price: '52$',
      oldPrice: '60$',
      rating: '4.7',
    },
    {
      imgSrc: require('../images/6.jpg'),
      altText: 'Apple EarPods',
      productName: 'Apple EarPods',
      price: '50$',
      rating: '4.5',
    },
    {
      imgSrc: require('../images/7.jpg'),
      altText: 'Apple EarPods Box',
      productName: 'Apple EarPods Box',
      price: '30$',
      rating: '4.5',
    },
  ];

  const wirelessHeadphones = [
    {
      imgSrc: require('../images/8.jpg'),
      altText: 'Apple BYZ S852I',
      productName: 'Apple BYZ S852I',
      price: '52$',
      oldPrice: '60$',
      rating: '4.7',
    },
    {
      imgSrc: require('../images/9.jpg'),
      altText: 'Apple EarPods',
      productName: 'Apple EarPods',
      price: '50$',
      rating: '4.5',
    },
    {
      imgSrc: require('../images/4.jpg'),
      altText: 'Apple EarPods Box',
      productName: 'Apple EarPods Box',
      price: '30$',
      rating: '4.5',
    },
  ];

  return (
    <div>
      <div className="banner">
        <div className="text-container">
          <h1>Аксессуары для iPhone 13 Pro Max</h1>
        </div>
        <div className="image-container">
          <img src={png2} alt="iPhone 13 Pro Max" />
        </div>
      </div>

      <div className="container1">
        <h2>{t ? t('mainPage.cases') : null}</h2>
        <div className="product-grid">
          {cases.map((product, index) => (
            <CategoryProduct key={index} {...product} />
          ))}
        </div>

        <h2>{t('mainPage.headphones')}</h2>
        <div className="product-grid">
          {headphones.map((product, index) => (
            <NormalProduct key={index} {...product} />
          ))}
        </div>

        <h2>{t('mainPage.wirelessHeadphones')}</h2>
        <div className="product-grid">
          {wirelessHeadphones.map((product, index) => (
            <NormalProduct key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
