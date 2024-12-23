// CheckoutPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/checkout.css';
import { createOrderFromCart } from '../api/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    shipping_notes: ''
  });
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart-items/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
        const data = await response.json();
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
        setTotalPrice(total);
      } catch (err) {
        setError('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const validateForm = () => {
        const errors = {};
        
        if (!orderData.full_name.trim()) {
          errors.full_name = 'Full name is required';
        }
        
        if (!orderData.email.trim() || !/\S+@\S+\.\S+/.test(orderData.email)) {
          errors.email = 'Valid email is required';
        }
        
        if (!orderData.phone.trim()) {
          errors.phone = 'Phone number is required';
        }
        
        if (!orderData.address.trim()) {
          errors.address = 'Address is required';
        }
        
        if (!orderData.city.trim()) {
          errors.city = 'City is required';
        }
        
        if (!orderData.postal_code.trim()) {
          errors.postal_code = 'Postal code is required';
        }
        
        return errors;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setError('Please fill in all required fields correctly.');
          return;
        }
      
        try {
          const submitData = {
            ...orderData,
            total_price: totalPrice  // добавьте это поле
          };
          const orderResult = await createOrderFromCart(submitData);
          navigate(`/order-confirmation/${orderResult.id}`);
        } catch (err) {
          setError('Failed to create order. Please try again.');
        }
      };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (cartItems.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="checkout-container">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.product_image} alt={item.product_name} className="item-image" />
              <div className="item-details">
                <h3>{item.product_name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product_price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={orderData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={orderData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={orderData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={orderData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={orderData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={orderData.postal_code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping_notes">Shipping Notes (Optional)</label>
          <textarea
            id="shipping_notes"
            name="shipping_notes"
            value={orderData.shipping_notes}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;