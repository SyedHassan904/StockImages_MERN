// pages/web/Wishlist.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../contexts/AuthContext';
import  useWishlist  from '../../hooks/useWishlist';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import WishlistItem from '../../components/web/WishlistItem/WishlistItem';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, loading, fetchWishlist } = useWishlist();
  const containerRef = useRef();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  // useEffect(() => {
  //   if (!loading && wishlist.length > 0) {
  //     gsap.from(containerRef.current.querySelectorAll('.wishlist-item'), {
  //       duration: 0.6,
  //       y: 30,
  //       opacity: 0,
  //       stagger: 0.1,
  //       ease: "power3.out"
  //     });
  //   }
  // }, [loading, wishlist]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState 
          title="Authentication Required"
          description="Please sign in to view your wishlist"
          icon="🔒"
          actionText="Sign In"
          actionLink="/login?returnTo=/wishlist"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        <div ref={containerRef} className="space-y-4">
          {wishlist.length === 0 ? (
            <EmptyState 
              title="Your wishlist is empty"
              description="Start saving your favorite images by clicking the heart icon"
              icon="❤️"
              actionText="Browse Gallery"
              actionLink="/gallery"
            />
          ) : (
            wishlist.map(item => (
              <WishlistItem key={item._id} image={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;