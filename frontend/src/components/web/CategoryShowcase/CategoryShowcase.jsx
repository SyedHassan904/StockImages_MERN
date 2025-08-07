import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/stock/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.categories);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      gsap.from(containerRef.current.querySelectorAll('.category-card'), {
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [categories]);

  return (
    <div className="py-10 px-4 lg:px-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Browse by Category</h2>
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(({ _id, count, coverImage }) => (
          <Link
            key={_id}
            to={`/categoryBased?category=${encodeURIComponent(_id.toLowerCase())}`}
            className="category-card relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="h-60 w-full bg-gray-200 relative overflow-hidden">
              <img
                src={coverImage || '/fallback.jpg'}
                alt={_id}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 brightness-[1.1]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Text Overlay */}
            <div className="absolute left-4 right-4 bottom-4 bg-black/50 backdrop-blur-sm rounded-md px-3 py-2">
              <h3 className="text-white text-lg font-semibold capitalize">{_id}</h3>
              <p className="text-gray-200 text-sm">{count} image{count !== 1 ? 's' : ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;
