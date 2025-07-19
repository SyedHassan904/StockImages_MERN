// components/web/RelatedImages/RelatedImages.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useImageContext } from '../../../contexts/ImageContext';
import ImageCard from '../../common/ImageCard/ImageCard';

const RelatedImages = ({ currentImageId, category }) => {
  const { images } = useImageContext();
  const containerRef = useRef();

  const relatedImages = images
    .filter(img => img.id !== currentImageId && img.category === category)
    .slice(0, 4);

  useEffect(() => {
    if (relatedImages.length > 0) {
      gsap.from(containerRef.current.querySelectorAll('.image-card'), {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, [relatedImages]);

  if (relatedImages.length === 0) return null;

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relatedImages.map(image => (
        <ImageCard key={image.id} image={image} showDetails={false} />
      ))}
    </div>
  );
};

export default RelatedImages;