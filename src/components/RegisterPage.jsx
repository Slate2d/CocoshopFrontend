// components/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import "../css/registrationStyle.css"

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    const formattedData = {
        ...formData,
        password1: formData.password, // Переименуем поле
        password2: formData.password2,
      };
    try {
      const response = await fetch('http://localhost:8000/shop/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        // Redirect to verification pending page after 2 seconds
        setTimeout(() => {
          navigate('/verify-pending', { 
            state: { email: formData.email }
          });
        }, 2000);
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during registration. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
                <div className="register-container">
            <h1>Создать аккаунт</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.general && <p className="register-error-message">{errors.general}</p>}
            <form onSubmit={handleSubmit}>
                <div className="register-form-group">
                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {errors.username && <p className="register-error-message">{errors.username}</p>}
                </div>
                <div className="register-form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="register-error-message">{errors.email}</p>}
                </div>
                <div className="register-form-group">
                <label htmlFor="first_name">Имя</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                {errors.first_name && <p className="register-error-message">{errors.first_name}</p>}
                </div>
                <div className="register-form-group">
                <label htmlFor="last_name">Фамилия</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                {errors.last_name && <p className="register-error-message">{errors.last_name}</p>}
                </div>
                <div className="register-form-group">
                <label htmlFor="password">Пароль</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="register-error-message">{errors.password}</p>}
                </div>
                <div className="register-form-group">
                <label htmlFor="password2">Подтверждение пароля</label>
                <input
                    type={showPassword2 ? 'text' : 'password'}
                    id="password2"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />
                {errors.password2 && <p className="register-error-message">{errors.password2}</p>}
                </div>
                <button type="submit" className="register-btn" disabled={isLoading}>
                {isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
                </button>
            </form>
            </div>
  );
};

export default RegisterPage;