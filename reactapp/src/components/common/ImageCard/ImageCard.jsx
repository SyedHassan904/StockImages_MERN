import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import useWishlist from '../../../hooks/useWishlist.jsx';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const ImageCard = ({ image }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    setIsWishlisted(isInWishlist(image._id));
  }, [image._id, isInWishlist]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      gsap.to(cardRef.current, {
        duration: 0.6,
        x: [-5, 5, -5, 5, 0],
        ease: "power1.inOut",
      });
      return;
    }

    const btn = cardRef.current.querySelector('.wishlist-btn');

    if (isWishlisted) {
      gsap.to(btn, {
        duration: 0.3,
        scale: 0.8,
        onComplete: () => {
          removeFromWishlist(image._id);
          setIsWishlisted(false);
          gsap.to(btn, { scale: 1 });
        },
      });
    } else {
      gsap.to(btn, {
        duration: 0.6,
        scale: [1, 1.3, 1],
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          addToWishlist(image._id);
          setIsWishlisted(true);
        },
      });
    }
  };

  return (
    <Link
      to={`/image/${image._id}`}
      ref={cardRef}
      className="group relative flex flex-col overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
      style={{ height: '360px' }}
    >
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={image.fileUrl}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title + Wishlist */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-900 font-semibold text-sm truncate">{image.title}</h3>
          <button
            onClick={handleWishlistClick}
            className={`wishlist-btn p-1 rounded-full ${
              isWishlisted ? 'text-red-500 bg-red-100' : 'text-gray-400 hover:text-red-500'
            } transition-colors`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Prices (Always show both) */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {image.pricePKR && (
            <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
              Rs. {Number(image.pricePKR).toLocaleString()}
            </div>
          )}
          {image.priceUSD && (
            <div className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
              ${Number(image.priceUSD).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>
      </div>

      {/* View Icon on Hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-white rounded-full shadow text-indigo-600 hover:bg-indigo-100">
          <FiEye className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
