import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import About from './pages/web/About.jsx';
import Blog from './pages/web/Blog.jsx';
import Contact from './pages/web/Contact.jsx';
import Terms from './pages/web/Terms.jsx';
import Privacy from './pages/web/Privacy.jsx';
import License from './pages/web/License.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'

import Navbar from './components/common/Navbar/Navbar.jsx';
import Layout from './components/common/Layout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx'; // 👈 import scroll-to-top

import CategoryBased from './components/web/ImageGallery/CategoryBased.jsx';
import Home from './pages/web/Home';
import Gallery from './pages/web/Gallery';
import ImageDetail from './pages/web/ImageDetail';
import Wishlist from './pages/web/Wishlist';
import Profile from './pages/web/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Pricing from './pages/web/Pricing.jsx';

// import NotFound from './pages/NotFound';
// import Search from './pages/web/Search';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Global Navbar on every page */}
      <Navbar />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Main App Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/categoryBased" element={<Layout><CategoryBased /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/license" element={<Layout><License /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
        <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />

        {/* Routes wrapped with Layout (adds top padding only) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/image/:id" element={<Layout><ImageDetail /></Layout>} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Layout><Wishlist /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Future routes */}
        {/* <Route path="/search" element={<Layout><Search /></Layout>} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Global Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">VisualStock</h3>
            <p className="text-gray-400">Premium stock images for your creative projects.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="/search" className="hover:text-white">Search</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/terms" className="hover:text-white">Terms</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="/license" className="hover:text-white">License</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700">
          <p>© {new Date().getFullYear()} VisualStock. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
