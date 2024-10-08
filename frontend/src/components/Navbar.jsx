import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          ShopEase
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            About
          </Link>
          
        </div>

        {/* Cart & Account Icons */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/cart"
            className="text-gray-300 hover:text-white transition duration-300"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7H21m-14 6v6m0 0a2 2 0 104 0v-6a2 2 0 10-4 0zm6 0v6m0 0a2 2 0 104 0v-6a2 2 0 10-4 0z"
              />
            </svg>
          </Link>
          <Link
            to="/signin"
            className="text-gray-300 hover:text-white transition duration-300"
            aria-label="Account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A12.042 12.042 0 0112 15.5c2.87 0 5.499 1.03 7.879 2.304M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="mobile-menu-button focus:outline-none"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-gray-900 transition-all duration-300 ease-in-out`}
      >
        <Link
          to="/"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition duration-300"
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition duration-300"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition duration-300"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
