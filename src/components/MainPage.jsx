import React, { useState, useEffect } from 'react';
import './../css/stylemain.css';
import '../css/product.css';
import png2 from '../images/iPhone-13-Pro-Max-silver-1000x1000 1.png';
import { useTranslation } from 'react-i18next';
import NormalProduct from './NormalProduct';
import { getProducts } from '../api/api';

const MainPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const brandName = product.brand.name;
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(product);
    return acc;
  }, {});

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="banner">
        <div className="text-container">
          <h1>Аксессуары для Iphone 13 Pro Max</h1>
        </div>
        <div className="image-container">
          <img src={png2} alt="iPhone 13 Pro Max" />
        </div>
      </div>

      <div className="container1">
        {Object.entries(groupedProducts).map(([brandName, brandProducts]) => (
          <div key={brandName}>
            <h2>{brandName}</h2>
            <div className="product-slider">
              <button
                className="scroll-button left"
                onClick={() => scrollContainer(`slider-${brandName}`, 'left')}
              >
                &lt;
              </button>
              <div className="product-grid" id={`slider-${brandName}`}>
                {brandProducts.map((product) => (
                  <NormalProduct
                    key={product.id}
                    id={product.id}
                    imgSrc={product.image_url}
                    altText={product.name}
                    productName={product.name}
                    price={`$${product.price}`}
                    rating="4.5"
                  />
                ))}
              </div>
              <button
                className="scroll-button right"
                onClick={() => scrollContainer(`slider-${brandName}`, 'right')}
              >
                &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
