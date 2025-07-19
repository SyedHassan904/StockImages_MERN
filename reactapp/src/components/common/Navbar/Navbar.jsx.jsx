// components/common/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import pf from './pfkotlin.png'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // Entry animation
    gsap.from(navbarRef.current, {
      duration: 0.8,
      y: -50,
      opacity: 0,
      ease: 'power3.out',
    });

    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    gsap.to('.nav-item', {
      duration: 0.3,
      opacity: 0,
      y: -10,
      stagger: 0.1,
      onComplete: logout,
    });
  };

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={pf} alt="Logo" className="h-8 w-auto rounded" />
            <span className="text-xl font-bold text-gray-900">VisualStock</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
             <Link to="/" className="nav-item text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Home
            </Link>
            <Link to="/gallery" className="nav-item text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Gallery
            </Link>
            <Link to="/pricing" className="nav-item text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Pricing
            </Link>
            {isAuthenticated && (
              <Link to="/wishlist" className="nav-item text-gray-700 hover:text-indigo-600 text-sm font-medium">
                Wishlist
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user?.profileURL || '/default-avatar.jpg'}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg rounded-b-md">
          <div className="px-4 py-3 space-y-2">
            <Link to="/gallery" className="block text-gray-700 hover:text-indigo-600 font-medium">
              Gallery
            </Link>
            <Link to="/pricing" className="block text-gray-700 hover:text-indigo-600 font-medium">
              Pricing
            </Link>
            {isAuthenticated && (
              <Link to="/wishlist" className="block text-gray-700 hover:text-indigo-600 font-medium">
                Wishlist
              </Link>
            )}
            <hr />
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mt-3">
                  <img
                    src={user?.avatar || '/default-avatar.jpg'}
                    alt="User avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-900 font-medium">{user?.name}</p>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left mt-3 text-sm text-gray-500 hover:text-indigo-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="space-y-2 mt-3">
                <Link to="/login" className="block text-gray-700 hover:text-indigo-600 font-medium">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
