// components/common/EmptyState/EmptyState.jsx
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const EmptyState = ({ title, description, icon, actionText, actionLink }) => {
  const containerRef = useRef();

  useEffect(() => {
    gsap.from(containerRef.current, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md mx-auto"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;