import React from "react";

const ProductCard = ({ imgSrc, altText, name, rating, price, oldPrice }) => (
  <div className="product-card">
    <img src={require(`../images/${imgSrc}`)} alt={altText} />
    <p>{name}</p>
    <div className="product-info">
      {rating && <span className="rating">{rating}</span>}
      {oldPrice ? (
        <span className="price sale">
          {price}$ <span className="old-price">{oldPrice}$</span>
        </span>
      ) : (
        <span className="price">{price}$</span>
      )}
    </div>
  </div>
);

export default ProductCard;
