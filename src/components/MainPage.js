import React from 'react';
import './../css/stylemain.css';
import png2 from '../images/2.jpg';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();

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
          <a href="#">
            <div className="product-card">
              <img src={require('../images/10.jpg')} alt="Стеклянные Чехлы" />
              <p>Стеклянные</p>
            </div>
          </a>
          <a href="#">
            <div className="product-card">
              <img src={require('../images/1.jpg')} alt="Силиконовые Чехлы" />
              <p>Силиконовые</p>
            </div>
          </a>
          <a href="#">
            <div className="product-card">
              <img src={require('../images/3.jpg')} alt="Кожаные Чехлы" />
              <p>Кожаные</p>
            </div>
          </a>
        </div>

        <h2>{t('mainPage.headphones')}</h2>
        <div className="product-grid">
          <div className="product-card">
            <a href="#">
              <img src={require('../images/5.jpg')} alt="Apple BYZ S852I" />
              <p>Apple BYZ S852I</p>
              <div className="product-info">
                <span className="rating">4.7</span>
                <span className="price sale">
                  52$ <span className="old-price">60$</span>
                </span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>

          <div className="product-card">
            <a href="#">
              <img src={require('../images/6.jpg')} alt="Apple EarPods" />
              <p>Apple EarPods</p>
              <div className="product-info">
                <span className="rating">4.5</span>
                <span className="price">50$</span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>

          <div className="product-card">
            <a href="#">
              <img
                src={require('../images/7.jpg')}
                alt="Apple EarPods Box"
                style={{ height: '110px' }}
              />
              <p>Apple EarPods</p>
              <div className="product-info">
                <span className="rating">4.5</span>
                <span className="price">30$</span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        <h2>{t('mainPage.wirelessHeadphones')}</h2>
        <div className="product-grid">
          <div className="product-card">
            <a href="#">
              <img src={require('../images/8.jpg')} alt="Apple BYZ S852I" />
              <p>Apple BYZ S852I</p>
              <div className="product-info">
                <span className="rating">4.7</span>
                <span className="price sale">
                  52$ <span className="old-price">60$</span>
                </span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>
          <div className="product-card">
            <a href="#">
              <img src={require('../images/9.jpg')} alt="Apple EarPods" />
              <p>Apple EarPods</p>
              <div className="product-info">
                <span className="rating">4.5</span>
                <span className="price">50$</span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>

          <div className="product-card">
            <a href="#">
              <img src={require('../images/4.jpg')} alt="Apple EarPods Box" style={{height: '110px'}}/>
              <p>Apple EarPods</p>
              <div className="product-info">
                <span className="rating">4.5</span>
                <span className="price">30$</span>
              </div>
            </a>
            <div className="button-container">
              <button>
                <img
                  src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
                  alt="Add to Cart"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0px',
                  }}
                />
              </button>
              <button>
                <img
                  src={require('../images/free-icon-add-to-favorites-4989206.png')}
                  alt="Add to Cart"
                  style={{
                    width: '15px',
                    height: '15px',
                    marginRight: '0px',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;