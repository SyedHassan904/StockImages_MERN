// hooks/useWishlist.js
import { useState, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useImageContext } from '../contexts/ImageContext';


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};


const useWishlist = () => {
  const { isAuthenticated } = useAuth();
  const { images } = useImageContext();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      // setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/wishlist-api/wishlist`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data.wishlist);

        // Animate wishlist items
        // gsap.from('.wishlist-item', {
        //   duration: 0.6,
        //   y: 30,
        //   opacity: 0,
        //   stagger: 0.1,
        //   ease: "power3.out"
        // });
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      // setLoading(false);
    }
  };

  const isInWishlist = (imageId) => {
    return wishlist.some(item => item._id === imageId);
  };

  const addToWishlist = async (imageId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/wishlist-api/wishlist/add/${imageId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const imageToAdd = images.find(img => img._id === imageId);
        if (imageToAdd) {
          setWishlist(prev => [...prev, imageToAdd]);
        }
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeFromWishlist = async (imageId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/wishlist-api/wishlist/remove/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setWishlist(prev => prev.filter(item => item._id !== imageId));
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return {
    wishlist,
    loading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist
  };
};

export default useWishlist;