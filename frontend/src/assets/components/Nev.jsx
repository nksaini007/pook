import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import img from '../img/profile.gif';

// Profile icon with tooltip
const ProfileIcon = () => (
  <div
    className="relative group cursor-pointer ml-4"
    tabIndex={0}
    aria-label="Profile"
  >
    <img
      src={img}
      alt="Profile"
      className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
    />
    <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 group-focus-within:scale-100 transition-transform duration-200 bg-gray-800 text-white px-3 py-1 rounded-md text-xs shadow-md whitespace-nowrap z-20">
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
  };

  return (
    <nav className="bg-gray-900 text-gray-200 shadow-md rounded-b-lg md:rounded-none sticky top-0 z-50 font-mono w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center py-3">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <div className="text-2xl font-bold text-pink-500 tracking-widest">
              pook.in
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 md:hidden hover:text-pink-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-1/3 mt-3 md:mt-0"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-500"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-500"
            >
              <FaSearch />
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center mt-3 md:mt-0">
            {['Home', 'Appliances', 'Raw Materials', 'Services', 'Contact'].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}

            <a
              href="/login"
              className="ml-4 px-4 py-1 rounded-full bg-pink-600 text-white font-semibold hover:bg-green-300 hover:text-gray-900 transition-colors duration-200"
            >
              Login
            </a>

            <ProfileIcon />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-gray-800 space-y-4 text-base font-medium">
          {['Home', 'Appliances', 'Raw Materials', 'Services', 'Contact'].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                className="block text-gray-200 hover:text-pink-400 transition-colors"
              >
                {item}
              </a>
            )
          )}

          <a
            href="/login"
            className="block mt-4 px-5 py-2 rounded-full bg-pink-600 text-white text-center font-semibold hover:bg-pink-400 transition"
          >
            Login
          </a>

          <div className="flex justify-center pt-4">
            <ProfileIcon />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nev;
