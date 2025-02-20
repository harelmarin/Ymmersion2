import React, { useState } from "react";
import Statistics from "../components/common/Statistcs";
import Navbar from "../components/common/Navbar";
import {
  CreateVehicle,
  GetLastAddedVehicle,
  fetchAllVehicle,
} from "../services/vehicleService";
import AddVehiclesForm from "../components/form/AddVehiclesForm";
import { VehicleData } from "../types/vehicleData";
import { GetLastAddedClient, CreateClient } from "../services/clientService";
import AddClientForm from "../components/form/AddClientForm";
import { ClientData } from "../types/clientData";
import RecentVehicle from "../components/common/RecentVehicle";
import RecentTransaction from "../components/common/RecentTransaction";
import RecentClient from "../components/common/RecentClient"
import { FileUp, FileDown } from "lucide-react";
import { exportVehiclesToExcel } from "../utils/exportVehiclesToExcel";
import { importVehiclesFromExcel } from "../utils/importVehiclesFromExcel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { data: vehicles } = fetchAllVehicle();
  const { data: lastVehicles, refetch: refetchLastVehicles } =
    GetLastAddedVehicle();
  const { data: lastAddedClient, refetch: refetchLastAddedClient } =
    GetLastAddedClient();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  const createVehicleMutation = CreateVehicle();
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
      await refetchLastVehicles();
      window.location.reload()
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
    }
  };

  const handleImportVehicles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    let ignoredCount = 0;

    try {
      const vehiclesFromFile = await importVehiclesFromExcel(file);

      for (const vehicle of vehiclesFromFile) {
        try {
          await createVehicleMutation.mutateAsync(vehicle);
        } catch (error: any) {
          if (
            error?.response?.data?.message?.includes(
              "Un véhicule avec ce VIN, matricule ou plaque existe déjà"
            )
          ) {
            ignoredCount++;
            console.warn("Véhicule en double ignoré:", vehicle);
            continue;
          }
          throw error;
        }
      }

      const addedCount = vehiclesFromFile.length - ignoredCount;
      let message = `Importation réussie ! (${addedCount} véhicules ajoutés)`;
      if (ignoredCount > 0) {
        message += ` - ${ignoredCount} véhicules ignorés car déjà existants.`;
      }
      toast.success(message, { position: "bottom-right", autoClose: 5000 });
      refetchLastVehicles();
    } catch (error) {
      console.error("Erreur lors de l'importation :", error);
      toast.error("Erreur lors de l'importation !", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setImporting(false);
    }
  };

  const handleAddClient = async (formData: ClientData) => {
    try {
      const { id, ...clientDataWithoutId } = formData;
      await createClientMutation.mutateAsync({
        ...clientDataWithoutId,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "",
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
            <AddVehiclesForm
              onSubmit={handleAddVehicle}
              onCancel={() => setIsAddModalOpen(false)}
            />
          )}

          {isAddClientModalOpen && (
            <AddClientForm
              onSubmit={handleAddClient}
              onCancel={() => setIsAddClientModalOpen(false)}
            />
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setIsAddClientModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg"
              >
                Ajouter client
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg"
              >
                Ajouter véhicule
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg">
                Créer facture
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg">
                Exporter rapports
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-6 mt-6">
              Manipulation de données
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <label className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center gap-4 cursor-pointer">
                <FileDown />
                Importer véhicules (.xlsx)
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleImportVehicles}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => vehicles && exportVehiclesToExcel(vehicles)}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex items-center gap-4"
              >
                <FileUp />
                Exporter véhicules (.xlsx)
              </button>
            </div>
          </section>
        </div>
      </div>
      {}
      <ToastContainer />
    </>
  );
};

export default Home;
