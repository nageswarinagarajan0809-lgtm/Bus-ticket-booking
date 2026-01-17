import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <FaBus size={28} />
          <span>Bus Booking</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/search" className="hover:text-blue-200 transition">
            Search Buses
          </Link>

          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-blue-200 transition">
              Admin
            </Link>
          )}

          {isAuthenticated && user?.role === 'user' && (
            <Link to="/my-bookings" className="hover:text-blue-200 transition">
              My Bookings
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
