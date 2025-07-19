// pages/web/Gallery.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useImageContext } from '../../contexts/ImageContext.jsx';
import ImageGallery from '../../components/web/ImageGallery/ImageGallery.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner.jsx';

const Gallery = () => {
  const { images, loading, error } = useImageContext();
  const headerRef = useRef();
  const galleryRef = useRef();

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    });
    
    // Gallery animation when images load
    if (!loading && images.length > 0) {
      gsap.from(galleryRef.current, {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: "power3.out"
      });
    }
  }, [loading, images]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Images</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our collection of premium images. Find the perfect visual for your project.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div ref={galleryRef}>
            <ImageGallery images={images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;