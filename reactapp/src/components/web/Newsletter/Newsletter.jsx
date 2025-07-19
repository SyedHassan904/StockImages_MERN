// components/web/Newsletter/Newsletter.jsx
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    gsap.from(containerRef.current.children, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Animation for submission
    gsap.to(formRef.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      onComplete: () => {
        setSubscribed(true);
        setEmail('');
        gsap.from('.success-message', {
          duration: 0.5,
          opacity: 0,
          y: 20
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="text-center bg-indigo-50 p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Subscribe to our newsletter for the latest collections, promotions, and design tips.
      </p>
      
      {!subscribed ? (
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <div className="success-message p-4 bg-green-50 text-green-700 rounded-lg inline-block">
          <p>Thank you for subscribing!</p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter;