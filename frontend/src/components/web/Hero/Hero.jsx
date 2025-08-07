import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SearchBar from '../../common/SearchBar/SearchBar';

const Hero = ({ onSearch }) => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const searchRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    gsap.from(titleRef.current, { duration: 1.2, y: 50, opacity: 0, ease: "power3.out" });
    gsap.from(subtitleRef.current, { duration: 1, y: 30, opacity: 0, delay: 0.3, ease: "power3.out" });
    gsap.from(searchRef.current, { duration: 0.8, y: 20, opacity: 0, delay: 0.6, ease: "back.out(1.7)" });
    gsap.from(videoRef.current, { duration: 1.5, opacity: 0, ease: "power2.inOut" });
    gsap.to(titleRef.current, { duration: 8, scale: 1.02, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <video ref={videoRef} autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl">
        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Stunning <span className="text-indigo-300">Visual Assets</span>
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          High-quality images, vectors, and illustrations for your creative projects. Download instantly and elevate your designs.
        </p>
        <div ref={searchRef}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 text-center">
        <div className="animate-bounce inline-block">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
