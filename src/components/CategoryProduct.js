import React from 'react';

const CategoryProduct = ({ imgSrc, altText, productName }) => {
  return (
    <div className="product-card">
      <a href="#">
        <img src={imgSrc} alt={altText} />
        <p>{productName}</p>
      </a>
    </div>
  );
};

export default CategoryProduct;
