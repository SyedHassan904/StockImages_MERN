import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../../components/web/Hero/Hero.jsx';
import CategoryShowcase from '../../components/web/CategoryShowcase/CategoryShowcase.jsx';
import Newsletter from '../../components/web/Newsletter/Newsletter.jsx';
import AllImages from '../../pages/web/AllImages.jsx';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
      });
    });
  }, []);

  return (
    <div className="home-page">
      <Hero onSearch={setSearchQuery} />

      <section ref={(el) => (sectionRefs.current[0] = el)} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore All Images</h2>
          <AllImages searchQuery={searchQuery} />
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[1] = el)} className="py-20 px-4 bg-gray-50">
        <CategoryShowcase />
      </section>

      <section ref={(el) => (sectionRefs.current[3] = el)} className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Home;
