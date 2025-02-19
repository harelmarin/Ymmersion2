import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchVehicle } from '../services/vehicleService';
import { VehicleData } from '../types/vehicleData';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vehicle } = fetchVehicle(id || '');

  const handleSaleClick = () => {
    if (id) {
      navigate(`/transaction/new/${id}`);
    }
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <p className="text-center text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Bouton Retour */}
        <button
          onClick={() => navigate('/vehicles')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Image principale */}
          <div className="relative h-[400px]">
            <img
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_oK_P89l6S3PO3OQocPYjdeee3_N3rmCjA&s"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <h1 className="text-4xl font-bold">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-xl opacity-90">{vehicle.version}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">
                    {vehicle.price.toLocaleString()} €
                  </p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${vehicle.available
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {vehicle.available ? 'Disponible' : 'Non disponible'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Informations générales */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Informations générales
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">État</p>
                    <p className="font-semibold text-gray-800">
                      {vehicle.condition === 'new' ? 'Neuf' : 'Occasion'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kilométrage</p>
                    <p className="font-semibold text-gray-800">
                      {vehicle.mileage.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Couleur</p>
                    <p className="font-semibold text-gray-800">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-semibold text-gray-800">
                      {vehicle.isRental ? 'Location' : 'Vente'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Identifiants */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Identifiants
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Numéro VIN</p>
                    <p className="font-mono bg-gray-50 px-3 py-2 rounded-lg text-gray-800">
                      {vehicle.vin}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Interne</p>
                    <p className="font-mono bg-gray-50 px-3 py-2 rounded-lg text-gray-800">
                      {vehicle.internalId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plaque d'immatriculation</p>
                    <p className="font-mono bg-blue-50 px-3 py-2 rounded-lg text-blue-800 font-semibold">
                      {vehicle.licensePlate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations financières */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Informations financières
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Prix de vente</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {vehicle.price.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prix d'achat</p>
                    <p className="font-semibold text-gray-800">
                      {vehicle.purchasePrice.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frais</p>
                    <p className="font-semibold text-gray-800">
                      {vehicle.fees.toLocaleString()} €
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton d'action */}
            {vehicle.available && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaleClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Procéder à la vente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;