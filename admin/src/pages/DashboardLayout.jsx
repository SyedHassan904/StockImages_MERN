// layouts/DashboardLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiImage, FiBarChart2, FiUpload, FiLogOut, FiSettings } from 'react-icons/fi';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
          <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-500">
            <h1 className="text-xl font-bold">VisualStock Admin</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link to="/" className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
              <FiHome className="mr-3" /> Dashboard
            </Link>
            <Link to="/images" className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
              <FiImage className="mr-3" /> Image Gallery
            </Link>
            <Link to="/stats" className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
              <FiBarChart2 className="mr-3" /> Statistics
            </Link>
            <Link to="/upload" className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
              <FiUpload className="mr-3" /> Upload Image
            </Link>
            
          </nav>
          <div className="p-4 border-t border-indigo-500">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-indigo-500 transition-colors"
            >
              <FiLogOut className="mr-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar (drawer) */}
      <div className="md:hidden">
        {/* Mobile menu button and drawer implementation would go here */}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100">
                {/* Mobile menu icon */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-2 text-lg font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                    SH
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
