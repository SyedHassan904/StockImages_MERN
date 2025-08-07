// components/TrackedImage.jsx
import { useEffect } from 'react';
import api from '../services/api';

const TrackedImage = ({ imageId, src, alt, className, onClick, ...props }) => {
  useEffect(() => {
    // Track impression when component mounts
    api.trackImpression(imageId).catch(console.error);
  }, [imageId]);

  const handleClick = (e) => {
    // Track click when image is clicked
    api.trackClick(imageId).catch(console.error);
    if (onClick) onClick(e);
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onClick={handleClick}
      {...props}
    />
  );
};

export default TrackedImage;