import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaArtstation } from "react-icons/fa";
import img from "../img/profile.gif";
import { Link } from "react-router-dom";

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
      className="w-9 h-9 rounded-full border-2 border-green-400/70 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
    />
    <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs shadow-md whitespace-nowrap z-20">
      Profile
    </div>
  </div>
);

const Nev = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md text-gray-800 shadow-md top-0 z-50 font-sans w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2 text-xl font-bold tracking-wide text-green-600">
              <FaArtstation className="text-2xl text-gray-300" />
              <span className="text-gray-800">Pook</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 md:hidden hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-7 w-7"
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
          {/* <form onSubmit={handleSearch} className="relative hidden md:flex w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500 transition-all duration-300 focus:shadow"
              placeholder="Search for products..."
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
            >
              <FaSearch />
            </button>
          </form> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Appliances", "RawMaterials", "Services", "Contact"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative text-gray-700 hover:text-green-600 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              )
            )}

            <Link
              to="/cart"
              className="px-4 py-1.5 rounded-full bg-orange-400 text-white font-medium hover:bg-green-600 transition shadow-sm flex items-center gap-2"
            >
              <FaShoppingCart /> Cart
            </Link>

            <a
              href="/login"
              className="px-4 py-1.5 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition shadow-sm"
            >
              Login
            </a>

            <ProfileIcon />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white space-y-4 text-base font-medium rounded-b-xl shadow-md animate-fadeIn">
          <form onSubmit={handleSearch} className="relative w-full mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
            >
              <FaSearch />
            </button>
          </form>

          {["Home", "Appliances", "Raw Materials", "Services", "Contact"].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                className="block text-gray-700 hover:text-green-600 transition-colors"
              >
                {item}
              </a>
            )
          )}

          <Link
            to="/cart"
            className="block px-5 py-2 rounded-full bg-orange-500 text-white text-center font-medium hover:bg-orange-600 transition shadow-sm"
          >
            <FaShoppingCart className="inline mr-2" /> Cart
          </Link>

          <a
            href="/login"
            className="block px-5 py-2 rounded-full bg-gray-200 text-gray-800 text-center font-medium hover:bg-green-100 hover:text-green-700 transition shadow-sm"
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
