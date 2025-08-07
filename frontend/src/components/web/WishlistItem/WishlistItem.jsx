// components/web/Wishlist/WishlistItem.jsx
import { gsap } from 'gsap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import  useWishlist  from '../../../hooks/useWishlist';

const WishlistItem = ({ image }) => {
  const itemRef = useRef();
  const { removeFromWishlist } = useWishlist();

  const handleRemove = async () => {
    // Animate out before removing
    await gsap.to(itemRef.current, {
      duration: 0.4,
      x: 100,
      opacity: 0,
      ease: "power3.in"
    });
    removeFromWishlist(image._id);
  };

  return (
    <div 
      ref={itemRef}
      className="wishlist-item flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/image/${image._id}`} className="flex items-center space-x-4 flex-1">
        <img 
          src={image.fileUrl} 
          alt={image.title} 
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{image.title}</h3>
          <p className="text-indigo-600 font-semibold">${image.pricePKR}</p>
        </div>
      </Link>
      <button 
        onClick={handleRemove}
        className="text-gray-400 hover:text-red-500 transition-colors p-2"
        aria-label="Remove from wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default WishlistItem;