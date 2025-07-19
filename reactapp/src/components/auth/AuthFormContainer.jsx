import React from 'react';

const AuthFormContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
