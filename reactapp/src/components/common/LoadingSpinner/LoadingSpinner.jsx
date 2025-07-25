// components/common/LoadingSpinner/LoadingSpinner.jsx
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const spinnerRef = useRef();
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  useEffect(() => {
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "linear"
    });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <svg
        ref={spinnerRef}
        className={`animate-spin ${sizes[size]} text-indigo-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;