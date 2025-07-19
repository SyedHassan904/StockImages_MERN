// pages/web/ImageDetail.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useImageContext } from '../../contexts/ImageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import useWishlist from '../../hooks/useWishlist.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner.jsx';
import RelatedImages from '../../components/web/RelatedImages/RelatedImages.jsx';

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { images, trackClick } = useImageContext();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [showLicense, setShowLicense] = useState(false);
  const contentRef = useRef();
  const isWishlisted = isInWishlist(id);

  useEffect(() => {
    if (image) trackClick(image._id);
  }, [image]);

  useEffect(() => {
    const foundImage = images.find(img => img._id === id);
    if (foundImage) {
      setImage(foundImage);
      setLoading(false);
    } else {
      fetchImage();
    }
  }, [id, images]);

  const fetchImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/stock/single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageID: id })
      });
      const data = await response.json();
      if (data.success) setImage(data.image);
      else setError(data.message || 'Image not found');
    } catch {
      setError('Failed to fetch image');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && image) {
      gsap.from(contentRef.current.children, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [loading, image]);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      gsap.to('.wishlist-btn', {
        duration: 0.6,
        x: [-5, 5, -5, 5, 0],
        ease: 'power1.inOut',
      });
      return;
    }
    isWishlisted ? removeFromWishlist(id) : addToWishlist(id);
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      navigate('/login?returnTo=' + encodeURIComponent(window.location.pathname));
      return;
    }
    // TODO: Add real download logic
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Image not found'}</p>
          <button
            onClick={() => navigate('/gallery')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="space-y-12">
          {/* Main Image and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <img
                src={image.fileUrl}
                alt={image.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleWishlistToggle}
                  className={`wishlist-btn p-3 rounded-full ${isWishlisted ? 'text-red-500 bg-white/90' : 'text-white bg-black/30'} shadow-md transition-colors`}
                >
                  <svg className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
              <h1 className="text-3xl font-bold text-gray-900">{image.title}</h1>
              <p className="text-gray-600">By {image.artist || 'Fusion Stock'}</p>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-indigo-600">${image.priceUSD}</span>
                <span className="text-sm text-gray-500">(PKR {image.pricePKR})</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {image.category}
                </span>
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Now</span>
              </button>

              {/* ✅ License Section with toggle */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">License Information</h3>
                <p className="text-gray-600 text-sm">
                  This image is licensed under our Standard License. You can use it for commercial and personal projects with some restrictions.
                </p>
                {!showLicense && (
                  <button
                    onClick={() => setShowLicense(true)}
                    className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View full license details
                  </button>
                )}
                {showLicense && (
                  <div className="mt-2 text-gray-700 text-sm space-y-2">
                    <p>✔️ Use in unlimited personal and commercial projects</p>
                    <p>✔️ Use in social media, ads, websites, videos</p>
                    <p>❌ You cannot resell, redistribute, or claim as your own</p>
                    <p>❌ No use in trademark or logo without extended license</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-300">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['details', 'related'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            {activeTab === 'details' && (
              <div className="prose max-w-none">
                <h3>About This Image</h3>
                <p>{image.description || 'No description available for this image.'}</p>
                <h3>Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags?.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'related' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Images</h3>
                <RelatedImages currentImageId={image._id} category={image.category} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
