import React from 'react';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page non trouvée
            </h2>
            <p className="text-gray-500 mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été
              déplacée.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                Retour
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Home size={20} />
                Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
