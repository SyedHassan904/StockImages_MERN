// components/web/Gallery/ImageGallery.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FilterPanel from '../../common/FilterPanel/FilterPanel.jsx';
import ImageCard from '../../common/ImageCard/ImageCard.jsx';

const ImageGallery = ({ images }) => {
  const [filteredImages, setFilteredImages] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'popular',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const galleryRef = useRef();

  useEffect(() => {
    if (!images || images.length === 0) {
      setFilteredImages([]);
      return;
    }

    let result = [...images];

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(img => img.category === filters.category);
    }

    // Filter by price (assumes PKR by default)
    result = result.filter(
      img =>
        img.pricePKR >= filters.priceRange[0] &&
        img.pricePKR <= filters.priceRange[1]
    );

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePKR - b.pricePKR);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePKR - a.pricePKR);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        result.sort((a, b) => (b.stats?.clicks || 0) - (a.stats?.clicks || 0));
    }

    setFilteredImages(result);

    // Animate gallery
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 10 },
        { duration: 0.4, opacity: 1, y: 0, ease: 'power3.out' }
      );
    }
  }, [filters, images]);

  return (
    <div className="relative">
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-30 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div
            className={`${
              mobileFiltersOpen
                ? 'block fixed inset-0 z-40 bg-black/50'
                : 'hidden'
            } lg:block lg:static lg:bg-transparent`}
          >
            <div
              className={`${
                mobileFiltersOpen
                  ? 'absolute top-0 right-0 h-full w-80 bg-white p-6 overflow-y-auto'
                  : 'w-64 flex-shrink-0'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {mobileFiltersOpen && (
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Image Grid */}
          <div
            ref={galleryRef}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {filteredImages.length > 0 ? (
              filteredImages.map(image => (
                <ImageCard key={image._id} image={image} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                No images found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
