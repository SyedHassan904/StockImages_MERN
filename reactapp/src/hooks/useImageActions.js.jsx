// hooks/useImageActions.js
import { useContext } from 'react';
import { gsap } from 'gsap';
import { useAuth } from './useAuth';
import { useImageContext } from '../contexts/ImageContext';

const useImageActions = () => {
  const { isAuthenticated } = useAuth();
  const { trackClick, trackImpression } = useImageContext();

  const handleImageClick = (imageId) => {
    if (!isAuthenticated) {
      // Bounce animation to indicate need to login
      gsap.to(`#image-${imageId}`, {
        duration: 0.6,
        x: [-5, 5, -5, 5, 0],
        ease: "power1.inOut"
      });
      return;
    }
    
    // Click animation
    gsap.to(`#image-${imageId}`, {
      duration: 0.3,
      scale: 0.95,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      onComplete: () => trackClick(imageId)
    });
  };

  const handleImageHover = (imageId) => {
    trackImpression(imageId);
  };

  const downloadImage = async (imageId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/images/download/${imageId}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `image-${imageId}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        
        // Success animation
        gsap.to('.download-success', {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return {
    handleImageClick,
    handleImageHover,
    downloadImage
  };
};

export default useImageActions;