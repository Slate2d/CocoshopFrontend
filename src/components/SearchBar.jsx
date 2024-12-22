import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../css//searchBar.css';  // Импорт стилей

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/search/?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (productId) => {
    setShowSuggestions(false);
    setQuery('');
    window.location.href = `/product/${productId}`; // это перезагружает страницу
};

  return (
    <div className="search-container" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search products..."
          className="search-input"  // Класс для input
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {showSuggestions && (query.length >= 2) && (
        <div className="search-suggestions">
          {isLoading ? (
            <div className="loading-indicator">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSearch(product.id)}
                className="suggestion-item"  // Класс для каждого элемента предложения
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="suggestion-image"  // Класс для изображения
                  />
                )}
                <div className="suggestion-details">
                  <div className="suggestion-name">{product.name}</div>
                  <div className="suggestion-price">${product.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
