// contexts/ImageContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/stock/list`);
      const data = await response.json();
      if (response.ok) {
        setImages(data.images);
        setFeaturedImages(data.featured);
        // Animate images load
        gsap.from('.image-item', {
          duration: 0.6,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out"
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const trackImpression = async (imageId) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/stat-api/images/${imageId}/impression`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Failed to track impression:', error);
    }
  };

  const trackClick = async (imageId) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/stat-api/images/${imageId}/click`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const value = {
    images,
    featuredImages,
    loading,
    error,
    fetchImages,
    trackImpression,
    trackClick
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};