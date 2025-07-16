import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../Context/userContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and regular menu */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-white">TripleBite</span>
            </Link>

            {/* Desktop Navigation */}
            {!isAuthPage && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`
                  }
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/recent-orders"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`
                  }
                >
                  Orders
                </NavLink>
              </div>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {userToken ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/payment"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Place Order
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 cursor-pointer hover:text-white text-sm font-medium"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          {!isAuthPage && (
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!isAuthPage && isMenuOpen && (
        <div className="sm:hidden bg-gray-900" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                  ? 'bg-gray-800 border-red-500 text-white'
                  : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                  ? 'bg-gray-800 border-red-500 text-white'
                  : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                }`
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                  ? 'bg-gray-800 border-red-500 text-white'
                  : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/recent-orders"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                  ? 'bg-gray-800 border-red-500 text-white'
                  : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                }`
              }
            >
              Orders
            </NavLink>

            {/* Mobile auth links */}
            {!userToken && (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                      ? 'bg-gray-800 border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                    }`
                  }
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                      ? 'bg-gray-800 border-red-500 text-white'
                      : 'border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white'
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {userToken && (
            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="flex items-center px-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}