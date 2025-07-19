// components/web/Testimonials/Testimonials.jsx
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Creative Director',
    content: 'The image quality is outstanding and the licensing is straightforward. Our design team uses this service daily.',
    avatar: '/avatars/1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Manager',
    content: 'I was able to find exactly what we needed for our campaign within minutes. The search filters are excellent.',
    avatar: '/avatars/2.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Freelance Designer',
    content: 'As an independent designer, the affordable pricing and high-quality assets are a game-changer for my business.',
    avatar: '/avatars/3.jpg'
  }
];

const Testimonials = () => {
  const containerRef = useRef();

  useEffect(() => {
    gsap.from(containerRef.current.querySelectorAll('.testimonial-card'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map(testimonial => (
        <div 
          key={testimonial.id}
          className="testimonial-card bg-white/10 p-6 rounded-xl backdrop-blur-sm"
        >
          <div className="flex items-center mb-4">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-medium text-white">{testimonial.name}</h4>
              <p className="text-white/70 text-sm">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-white/90 italic">"{testimonial.content}"</p>
          <div className="mt-4 flex text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;