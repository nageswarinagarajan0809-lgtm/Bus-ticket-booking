import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl text-gray-800 mb-4">Page Not Found</p>
        <a
          href="/"
          className="btn-primary"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
