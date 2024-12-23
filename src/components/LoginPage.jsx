import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`http://localhost:8000/shop/login/`, {
        username,
        password,
      });

      if (response.data.status === "success") {
        const { access, refresh } = response.data.tokens;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        navigate("/");
      } else {
        setError(response.data.message || "Ошибка авторизации");
      }
    } catch (err) { 
      if (err.response && err.response.status === 401) {
        setError("Неверное имя пользователя или пароль. Пожалуйста, попробуйте еще раз.");
      } else { 
        setError("Ошибка соединения с сервером.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Вход в систему</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">Войти</button>
      </form>
      <div className="register-prompt">
        <p>Нет аккаунта? <Link to="/register" className="register-link">Зарегистрируйтесь</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;