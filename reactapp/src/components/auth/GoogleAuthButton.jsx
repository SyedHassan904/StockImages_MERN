import React from 'react';

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/google`; // Adjust this URL to your backend route
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 py-2 px-4 rounded-md shadow-sm transition-all"
    >
      <img
        src="google-tile.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span className="text-gray-700 text-sm font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
