// components/web/FeaturedGallery/FeaturedGallery.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useImageContext } from '../../../contexts/ImageContext.jsx';
import ImageCard from '../../common/ImageCard/ImageCard.jsx';

const FeaturedGallery = () => {
  const { featuredImages } = useImageContext();
  const containerRef = useRef();

  useEffect(() => {
    if (Array.isArray(featuredImages) && featuredImages.length > 0) {
      gsap.from(containerRef.current.querySelectorAll('.image-card'), {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [featuredImages]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {Array.isArray(featuredImages) && featuredImages.map((image, index) => (
        <div
          key={image._id || image.id || index}
          className={`image-card ${index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
        >
          <ImageCard
            image={image}
            className={`${index === 0 ? 'h-full' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedGallery;
