// src/components/NotFound404.jsx
import React from "react";

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 text-red-800 text-center px-4">
      {/* Ghost */}
      <div className="relative w-28 h-28 bg-white rounded-t-full animate-bounce mb-6">
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <div className="w-7 h-7 bg-white rounded-full"></div>
          <div className="w-7 h-7 bg-white rounded-full"></div>
          <div className="w-7 h-7 bg-white rounded-full"></div>
        </div>
        {/* Eyes */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
          <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
          <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
        </div>
        {/* Mouth */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-2 bg-slate-900 rounded-b-full"></div>
      </div>

      {/* Text */}
      <h1 className="text-6xl font-bold text-pink-800">404</h1>
      <p className="mt-4 text-lg text-slate-300">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound404;
