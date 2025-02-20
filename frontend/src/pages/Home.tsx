import React, { useState } from 'react';
import Statistics from '../components/common/Statistcs';
import Navbar from '../components/common/Navbar';
import { CreateVehicle, GetLastAddedVehicle } from '../services/vehicleService';
import AddVehiclesForm from '../components/form/AddVehiclesForm';
import { VehicleData } from '../types/vehicleData';
import { GetLastAddedClient, CreateClient } from '../services/clientService';
import AddClientForm from '../components/form/AddClientForm';
import { ClientData } from '../types/clientData';
import RecentVehicle from '../components/common/RecentVehicle';
import RecentTransaction from '../components/common/RecentTransaction';
import { FileUp, FileDown } from 'lucide-react';
import { exportVehiclesToExcel } from '../utils/exportVehiclesToExcel';
import { fetchAllVehicle } from '../services/vehicleService';
import RecentClient from '../components/common/RecentClient';
const Home = () => {
  const { data: vehicles } = fetchAllVehicle();

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
              <RecentTransaction />
              <RecentVehicle />
              <RecentClient />
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

            <h2 className="text-2xl font-semibold text-gray-700 mb-6 mt-6">
              Manipulation de données
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200  hover:cursor-pointer gap-4">
                <FileDown />
                Importer données (.xlsx)
              </button>
              <button
                onClick={() => {
                  if (vehicles) {
                    exportVehiclesToExcel(vehicles);
                  }
                }}
                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200  hover:cursor-pointer gap-4"
              >
                <FileUp />
                Exporter données (.xlsx)
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
