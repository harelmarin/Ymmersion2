import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { fetchVehicle } from '../services/vehicleService';
import { VehicleData } from '../types/vehicleData';
import SaleButton from '../components/common/SaleButton';
import EditVehiclesForm from '../components/form/EditVehiclesForm';
import { updateVehicle } from '../services/vehicleService';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vehicle, refetch } = fetchVehicle(id || '');
  const mutation = updateVehicle(id || '', vehicle || ({} as VehicleData));
  const { mutateAsync } = mutation;
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updatedData: VehicleData) => {
    try {
      await mutateAsync(updatedData);
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-4">
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
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/vehicles')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à la liste
          </button>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Modifier
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {isEditing ? (
            <div className="p-6">
              <EditVehiclesForm
                vehicle={vehicle!}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <div className="p-8">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h1>
                    <p className="text-xl text-gray-600">{vehicle.version}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800 mb-2">
                      {vehicle.price.toLocaleString()} €
                    </p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        vehicle.available
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {vehicle.available ? 'Disponible' : 'Non disponible'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <p className="font-semibold text-gray-800">
                          {vehicle.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-semibold text-gray-800">
                          {vehicle.isRental ? 'Location' : 'Vente'}
                        </p>
                      </div>
                    </div>
                  </div>

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
                        <p className="text-sm text-gray-500">
                          Plaque d'immatriculation
                        </p>
                        <p className="font-mono bg-blue-50 px-3 py-2 rounded-lg text-blue-800 font-semibold">
                          {vehicle.licensePlate}
                        </p>
                      </div>
                    </div>
                  </div>

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
                        <p className="font-semibold text-gray-800 blur-sm transition-all duration-1000 hover:blur-none">
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

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                      Options du véhicule
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {vehicle.options && vehicle.options.length > 0 ? (
                        vehicle.options.map((option) => (
                          <span
                            key={option.id}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {option.name}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          Aucune option disponible
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {vehicle.available && (
                  <div className="mt-8 flex justify-end">
                    <SaleButton vehicleId={id || ''} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
