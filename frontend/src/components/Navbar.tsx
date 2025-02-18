import React from 'react';
import { useLogout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="w-[75%] mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <a href="/">
              <h2 className="text-xl font-bold text-gray-800">
                Garage la Phocéenne
              </h2>
            </a>
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un client ou un véhicule..."
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </a>
            <a href="/clients" className="text-gray-600 hover:text-gray-800">
              Clients
            </a>
            <a href="/vehicles" className="text-gray-600 hover:text-gray-800">
              Véhicules
            </a>

            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                Mon compte
              </button>

              {}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                <ul className="py-1">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Mon compte
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout()
                        
                      }}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
