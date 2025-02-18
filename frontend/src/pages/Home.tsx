import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  GetVehicleCount,
  GetNewVehiclesCount,
  GetUsedVehiclesCount,
  CreateVehicle,
  GetLastAddedVehicle,
} from '../services/vehicleService';
import AddVehiclesForm from '../components/form/AddVehiclesForm';
import { VehicleData } from '../types/vehicleData';

const Home = () => {
  const { data: vehicleCount, refetch: refetchVehicleCount } =
    GetVehicleCount();
  const { data: newVehiclesCount, refetch: refetchNewVehiclesCount } =
    GetNewVehiclesCount();
  const { data: usedVehiclesCount, refetch: refetchUsedVehiclesCount } =
    GetUsedVehiclesCount();
  const { data: lastVehicles, refetch: refetchLastVehicles } =
    GetLastAddedVehicle();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const createVehicleMutation = CreateVehicle();

  const handleAddVehicle = async (formData: VehicleData) => {
    try {
      const { id, ...vehicleDataWithoutId } = formData;

      await createVehicleMutation.mutateAsync({
        ...vehicleDataWithoutId,
        available: true,
        addedAt: new Date().toISOString(),
      } as VehicleData);

      setIsAddModalOpen(false);
      await Promise.all([
        refetchVehicleCount(),
        refetchNewVehiclesCount(),
        refetchUsedVehiclesCount(),
        refetchLastVehicles(),
      ]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-50 mt-20">
        <div className="w-[75%] mx-auto max-w-7xl">
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Véhicules en stock
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {vehicleCount}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {newVehiclesCount} neufs, {usedVehiclesCount} occasions
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Ventes du mois
                </h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-xs text-green-500 mt-2">
                  +20% vs mois dernier
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Clients actifs
                </h3>
                <p className="text-2xl font-bold text-blue-600">156</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Chiffre d'affaires
                </h3>
                <p className="text-2xl font-bold text-blue-600">125k€</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Gestion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-gray-600">
                    Dernières transactions
                  </h3>
                  <a
                    href="/transactions"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                  >
                    Voir tout
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Renault Clio IV</p>
                        <p className="text-sm text-gray-500">Vente • 15 000€</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Finalisée
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-gray-600">Véhicules récents</h3>
                  <a
                    href="/vehicles"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                  >
                    Voir tout
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="w-full">
                        {lastVehicles?.map((vehicle) => (
                          <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center w-full">
                            <div className="flex flex-col">
                              <p className="font-medium">
                                {vehicle.brand} {vehicle.model}
                              </p>
                              <p className="text-sm text-gray-500">
                                {vehicle.year} • {vehicle.mileage} km •{' '}
                                {vehicle.price}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                vehicle.condition === 'new'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {vehicle.condition === 'new'
                                ? 'Neuf'
                                : 'Occasion'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {isAddModalOpen && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-blue-100">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-blue-600 ">
                  Ajouter un nouveau véhicule
                </h2>
              </div>
              <AddVehiclesForm
                onSubmit={handleAddVehicle}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration hover:cursor-pointer">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nouvelle fiche client
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200  hover:cursor-pointer"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Ajouter véhicule
              </button>
              <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200  hover:cursor-pointer">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Créer facture
              </button>
              <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200  hover:cursor-pointer">
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Exporter rapports
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
