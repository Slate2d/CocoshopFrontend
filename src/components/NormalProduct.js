import React from 'react';

const NormalProduct = ({ imgSrc, altText, productName, price, oldPrice, rating }) => {
  return (
    <div className="product-card">
      <a href="#">
        <img src={imgSrc} alt={altText} />
        <p>{productName}</p>
        <div className="product-info">
          {rating && <span className="rating">{rating}</span>}
          {price && (
            <span className="price">
              {oldPrice ? (
                <>
                  <span className="sale">{price}</span> <span className="old-price">{oldPrice}</span>
                </>
              ) : (
                price
              )}
            </span>
          )}
        </div>
      </a>
      <div className="button-container">
        <button>
          <img
            src={require('../images/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png')}
            alt="Add to Cart"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
        <button>
          <img
            src={require('../images/free-icon-add-to-favorites-4989206.png')}
            alt="Add to Favorites"
            style={{ width: '15px', height: '15px' }}
          />
        </button>
      </div>
    </div>
  );
};

export default NormalProduct;
