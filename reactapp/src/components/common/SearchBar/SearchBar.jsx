import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const SearchBar = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial fade/slide-in animation
    gsap.from(searchRef.current, {
      duration: 0.8,
      y: 10,
      opacity: 0,
      ease: 'back.out(1.7)',
    });
  }, []);

  // 👇 Automatically show all images when text is cleared
  useEffect(() => {
    if (query.trim() === '') {
      if (onSearch) {
        onSearch('');
      } else {
        navigate('/search'); // or '/search?q=' depending on your backend
      }
    }
  }, [query, onSearch, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }

      gsap.to(searchRef.current, {
        duration: 0.3,
        scale: 0.98,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <form
      ref={searchRef}
      onSubmit={handleSearch}
      className="relative max-w-2xl w-full mx-auto transition-all duration-300"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for images..."
        className="w-full py-3 px-5 pr-12 rounded-full bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500 transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
