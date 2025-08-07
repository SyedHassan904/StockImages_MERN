import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAuth } from '../../../contexts/AuthContext.jsx';

const FilterPanel = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(true);
  const panelRef = useRef();
  const { user } = useAuth();
  const currency = user?.currency || 'USD';

  useEffect(() => {
    gsap.from(panelRef.current, {
      duration: 0.6,
      x: -20,
      opacity: 0,
      ease: "power3.out"
    });
  }, []);

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const togglePanel = () => {
    gsap.to(panelRef.current, {
      duration: 0.3,
      height: isOpen ? 0 : 'auto',
      opacity: isOpen ? 0 : 1,
      ease: "power3.inOut",
      onComplete: () => setIsOpen(!isOpen)
    });
  };

  return (
    <div
      ref={panelRef}
      className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
    >
      {/* Toggle Header */}
      <button
        onClick={togglePanel}
        className="flex items-center justify-between w-full mb-4 focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="space-y-6">
          {/* Category */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="nature">Nature</option>
              <option value="urban">Urban</option>
              <option value="people">People</option>
              <option value="abstract">Abstract</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
            <Slider
              range
              min={0}
              max={currency === 'PKR' ? 10000 : 500}
              step={currency === 'PKR' ? 100 : 1}
              value={filters.priceRange}
              onChange={handlePriceChange}
              trackStyle={[{ backgroundColor: '#6366f1' }]}
              handleStyle={[
                { backgroundColor: '#6366f1', borderColor: '#6366f1' },
                { backgroundColor: '#6366f1', borderColor: '#6366f1' }
              ]}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>
                {currency === 'PKR' ? `Rs. ${filters.priceRange[0]}` : `$${filters.priceRange[0]}`}
              </span>
              <span>
                {currency === 'PKR' ? `Rs. ${filters.priceRange[1]}` : `$${filters.priceRange[1]}`}
              </span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
            <div className="space-y-2">
              {['popular', 'newest', 'price-low', 'price-high'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`sort-${option}`}
                    name="sort-by"
                    type="radio"
                    checked={filters.sortBy === option}
                    onChange={() => setFilters({ ...filters, sortBy: option })}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor={`sort-${option}`} className="ml-3 block text-sm font-medium text-gray-700 capitalize">
                    {option.replace('-', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button Animation */}
          <button
            onClick={() => {
              gsap.to('.filter-apply-btn', {
                duration: 0.3,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
              });
            }}
            className="filter-apply-btn w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
