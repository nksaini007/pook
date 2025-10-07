import React, { useContext, useState } from "react";
import { FaSearch, FaShoppingCart, FaArtstation } from "react-icons/fa";
import img from "../img/profile.gif";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfileDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative ml-4">
      <img
        src={user?.profile || img}
        alt="Profile"
        className="w-9 h-9 rounded-full border-2 border-green-400/70 shadow-sm cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
          <p className="px-4 py-1 text-sm text-gray-800">{user.name}</p>
          <Link to="/dashboard" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link to="/cart" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
            Cart
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-1 text-sm text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Nev = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const links = ["Home", "Appliances", "RawMaterials", "Services", "Contact"];

  return (
    <nav className="bg-white/95 backdrop-blur-md text-gray-800 shadow-md top-0 z-50 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold tracking-wide text-green-600">
            <FaArtstation className="text-2xl text-gray-300" />
            <span className="text-gray-800">zoor.com</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <NavLink
                key={i}
                to={`/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-green-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "text-green-600 after:w-full" : ""
                  }`
                }
              >
                {link}
              </NavLink>
            ))}

           

            <Link
              to="/cart"
              className="px-4 py-1.5 rounded-full bg-orange-400 text-white font-medium hover:bg-green-600 flex items-center gap-2"
            >
              <FaShoppingCart /> Cart
            </Link>

            {!user ? <Link to="/login" className="px-4 py-1.5 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-green-100">Login</Link> : <ProfileDropdown user={user} logout={logout} />}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-green-600">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white space-y-4 text-base font-medium rounded-b-xl shadow-md">
          {links.map((link, i) => (
            <Link key={i} to={`/${link.toLowerCase()}`} className="block text-gray-700 hover:text-green-600">
              {link}
            </Link>
          ))}

        

          <Link to="/cart" className="block px-5 py-2 rounded-full bg-orange-500 text-white text-center font-medium hover:bg-orange-600">
            <FaShoppingCart className="inline mr-2" /> Cart
          </Link>

          {!user ? <Link to="/login" className="block px-5 py-2 rounded-full bg-gray-200 text-gray-800 text-center font-medium hover:bg-green-100">Login</Link> : <ProfileDropdown user={user} logout={logout} />}
        </div>
      )}
    </nav>
  );
};

export default Nev;
