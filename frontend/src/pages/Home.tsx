import React, { useState } from 'react';
import Statistics from '../components/common/Statistcs';
import Navbar from '../components/Navbar';
import { CreateVehicle, GetLastAddedVehicle } from '../services/vehicleService';
import AddVehiclesForm from '../components/form/AddVehiclesForm';
import { VehicleData } from '../types/vehicleData';
import { GetLastAddedClient, CreateClient } from '../services/clientService';
import AddClientForm from '../components/form/AddClientForm';
import { ClientData } from '../types/clientData';
const Home = () => {
  const { data: lastVehicles, refetch: refetchLastVehicles } =
    GetLastAddedVehicle();
  const { data: lastAddedClient, refetch: refetchLastAddedClient } =
    GetLastAddedClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const createVehicleMutation = CreateVehicle();
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const createClientMutation = CreateClient();

  const handleAddVehicle = async (formData: VehicleData) => {
    try {
      const { id, ...vehicleDataWithoutId } = formData;

      await createVehicleMutation.mutateAsync({
        ...vehicleDataWithoutId,
        available: true,
        addedAt: new Date().toISOString(),
      } as VehicleData);

      setIsAddModalOpen(false);
      await Promise.all([refetchLastVehicles()]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
    }
  };

  const handleAddClient = async (formData: ClientData) => {
    try {
      const { id, ...clientDataWithoutId } = formData;

      await createClientMutation.mutateAsync({
        ...clientDataWithoutId,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '',
      });

      setIsAddClientModalOpen(false);
      refetchLastAddedClient();
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <Statistics />
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Gestion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
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
                <div className="space-y-0">
                  {lastVehicles?.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#F2F6FE' : 'white',
                      }}
                      className="shadow-sm hover:shadow-md transition-all duration-200 p-4 "
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                        <div className="col-span-2 md:col-span-1">
                          <p className="font-semibold text-lg">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {vehicle.mileage.toLocaleString()} km
                          </p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">Prix :</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {vehicle.price}€
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">
                            Prix d'achat :
                          </p>
                          <p className="text-lg font-semibold text-gray-900 blur-sm hover:blur-none transition-all">
                            {vehicle.purchasePrice}€
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap 
              ${
                vehicle.condition === 'new'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
                          >
                            {vehicle.condition === 'new' ? 'Neuf' : 'Occasion'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-gray-600">Véhicules récents</h3>
                  <a
                    href="/vehicles"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                  >
                    Voir tout
                  </a>
                </div>
                <div className="divide-y divide-gray-200">
                  {lastVehicles?.map((vehicle) => (
                    <div key={vehicle.id} className="py-4">
                      <div className="hover:bg-gray-50 rounded-lg transition-colors p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">
                                {vehicle.brand} {vehicle.model}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {vehicle.version}
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

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Kilométrage
                              </p>
                              <p className="font-medium">
                                {vehicle.mileage.toLocaleString()} km
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prix</p>
                              <p className="font-medium text-blue-600">
                                {vehicle.price.toLocaleString()} €
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">VIN: </span>
                              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                                {vehicle.vin}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Plaque: </span>
                              <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded text-blue-700">
                                {vehicle.licensePlate}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-1">
                              {vehicle.options?.map((option, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {vehicle.isRental && (
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                  Location
                                </span>
                              )}
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {new Date(vehicle.addedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-gray-600">
                    Derniers clients inscrits
                  </h3>
                  <a
                    href="/clients"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                  >
                    Voir tout
                  </a>
                </div>
                <div className="divide-y divide-gray-200">
                  {lastAddedClient?.map((client) => (
                    <div key={client.id} className="py-3">
                      <div className="hover:bg-gray-50 rounded-lg transition-colors p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {client.firstName} {client.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {client.email} • {client.phoneNumber}
                            </p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Nouveau
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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

          {isAddClientModalOpen && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-blue-100">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Ajouter un nouveau client
                </h2>
              </div>
              <AddClientForm
                onSubmit={handleAddClient}
                onCancel={() => setIsAddClientModalOpen(false)}
              />
            </div>
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setIsAddClientModalOpen(true)}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration hover:cursor-pointer"
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
