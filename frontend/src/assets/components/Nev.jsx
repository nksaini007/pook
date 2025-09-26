import React, { useState } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import img from '../img/profile.gif';
const ProfileIcon = () => (
  <div className="relative group cursor-pointer ml-4" tabIndex={0} aria-label="Profile">
    {/* Custom GIF */}
    <img
      src={img}  // <-- Replace with your actual path
      alt="Profile"
      className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-220 group-hover:shadow-lg"
    />
    
    {/* Tooltip on hover */}
    <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gray-800 text-white px-3 py-1 rounded-md text-xs shadow-md">
      Profile
    </div>
  </div>
);

const Nev = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    // Replace this with actual search logic
  };

  return (
    <nav className="bg-gray-900 text-gray-200 shadow-lg sticky top-0 z-50 font-mono w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center h-auto py-3 space-y-2 md:space-y-0">
          {/* Top Row: Logo and Search */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <div className="text-2xl font-bold text-pink-500 tracking-widest">
              pook.in
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-200 hover:text-green-400 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar (Always Visible) */}
          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-1/3 self-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-1.5 rounded-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-400"
            >
              <FaSearch />
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Home</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Appliances</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Raw Materials</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Services</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Contact</a>

            <a
              href="/login"
              className="ml-4 px-4 py-1 rounded bg-pink-700 text-gray-100 font-semibold hover:bg-green-300 transition-colors duration-200"
            >
              Login
            </a>

            <ProfileIcon />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-gray-800 space-y-2 text-sm font-medium">
          <a href="#" className="block text-gray-200 hover:text-green-400">Home</a>
          <a href="#" className="block text-gray-200 hover:text-green-400">Appliances</a>
          <a href="#" className="block text-gray-200 hover:text-green-400">Raw Materials</a>
          <a href="#" className="block text-gray-200 hover:text-green-400">Services</a>
          <a href="#" className="block text-gray-200 hover:text-green-400">Contact</a>

          <a
            href="/login"
            className="block mt-2 px-4 py-2 rounded bg-pink-400 text-gray-900 font-semibold hover:bg-green-300 transition-colors duration-200 text-center"
          >
            Login
          </a>

          <div className="flex justify-center pt-2">
            <ProfileIcon />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nev;
