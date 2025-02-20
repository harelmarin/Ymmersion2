import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 mb-4 hover:shadow-xl transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-gray-600">{vehicle.version}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">VIN:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {vehicle.vin}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Plaque:</span>
              <span className="font-mono bg-blue-100 px-3 py-1 rounded-lg text-blue-800">
                {vehicle.licensePlate}
              </span>
              <span className="text-gray-600">Matricule:</span>
              <span className="font-mono bg-gray-100 px-3 py-1 rounded">
                {vehicle.internalId}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Kilométrage</p>
              <p className="font-semibold">
                {vehicle.mileage.toLocaleString()} km
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Couleur</p>
              <p className="font-semibold">{vehicle.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">État</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  vehicle.condition === 'new'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {vehicle.condition === 'new' ? 'Neuf' : 'Occasion'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  vehicle.isRental
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {vehicle.isRental ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Prix de vente</p>
                <p className="text-xl font-bold text-blue-600">
                  {vehicle.price.toLocaleString()} €
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Prix d'achat</p>
                <p className="text-lg font-semibold text-gray-900 blur-sm hover:blur-none transition-all">
                  {vehicle.purchasePrice?.toLocaleString()} €
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Frais</p>
              <p className="font-semibold text-gray-800">
                {vehicle.fees.toLocaleString()} €
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => onDelete(vehicle.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
