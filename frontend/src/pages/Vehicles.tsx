import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import {
  fetchAllVehicle,
  CreateVehicle,
  updateVehicle,
  DeleteVehicle,
} from '../services/vehicleService';
import AddVehiclesForm from '../components/form/AddVehiclesForm';
import EditVehiclesForm from '../components/form/EditVehiclesForm';
import { VehicleData } from '../types/vehicleData';
const Vehicles = () => {
  const { data: vehicles, isLoading, refetch } = fetchAllVehicle();
  const createVehicleMutation = CreateVehicle();
  const updateVehicleMutation = updateVehicle();
  const deleteVehicleMutation = DeleteVehicle();
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
    null,
  );

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];

    return vehicles
      .filter(
        (vehicle) =>
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter(
        (vehicle) =>
          !brandFilter ||
          vehicle.brand.toLowerCase() === brandFilter.toLowerCase(),
      )
      .filter(
        (vehicle) =>
          !conditionFilter ||
          vehicle.condition.toLowerCase() === conditionFilter.toLowerCase(),
      )
      .sort((a, b) => {
        if (priceSort === 'asc') return a.price - b.price;
        if (priceSort === 'desc') return b.price - a.price;
        return 0;
      });
  }, [vehicles, searchTerm, brandFilter, conditionFilter, priceSort]);

  const handleAddVehicle = async (formData: VehicleData) => {
    try {
      const { id, ...vehicleDataWithoutId } = formData;

      await createVehicleMutation.mutateAsync({
        ...vehicleDataWithoutId,
        available: true,
        addedAt: new Date().toISOString(),
      } as VehicleData);

      setIsAddModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
    }
  };

  const handleEditVehicle = async (formData) => {
    try {
      console.log('Données à mettre à jour:', {
        ...formData,
        id: selectedVehicle?.id,
      });

      await updateVehicleMutation.mutateAsync({
        ...formData,
        id: selectedVehicle?.id,
      });

      setIsEditModalOpen(false);
      setSelectedVehicle(null);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la modification du véhicule:', {
        error,
        formData,
        vehicleId: selectedVehicle?.id,
      });
    }
  };

  const handledeleteVehicle = async (id) => {
    try {
      await deleteVehicleMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression du véhicule:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-50 mt-16">
        <div className="w-[75%] mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">
              Gestion des véhicules
            </h1>
            <button
              onClick={() => setIsAddModalOpen(!isAddModalOpen)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
              {isAddModalOpen ? 'Masquer le formulaire' : 'Ajouter un véhicule'}
            </button>
          </div>

          {isAddModalOpen && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-blue-100">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Ajouter un nouveau véhicule
                </h2>
              </div>
              <AddVehiclesForm
                onSubmit={handleAddVehicle}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Toutes les marques</option>
                <option value="peugeot">Peugeot</option>
                <option value="renault">Renault</option>
                <option value="citroen">Citroën</option>
                <option value="toyota">Toyota</option>
              </select>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">État</option>
                <option value="new">Neuf</option>
                <option value="used">Occasion</option>
              </select>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Prix</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600">
                          Année : {vehicle.year} • Kilométrage :{' '}
                          {vehicle.mileage} km
                        </p>
                        <p className="text-lg font-semibold text-blue-600">
                          {vehicle.price.toLocaleString()} €
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            vehicle.condition.toLowerCase() === 'new'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {vehicle.condition.toLowerCase() === 'new'
                            ? 'Neuf'
                            : 'Occasion'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hover:cursor-pointer"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsEditModalOpen(true);
                          document
                            .getElementById(`vehicle-${vehicle.id}`)
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'center',
                            });
                        }}
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors "
                        onClick={() => handledeleteVehicle(vehicle.id)}
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

                  {isEditModalOpen && selectedVehicle?.id === vehicle.id && (
                    <div
                      id={`vehicle-${vehicle.id}`}
                      className="mt-4 bg-white p-6 rounded-lg shadow-lg border-2 border-green-100"
                    >
                      <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-green-600">
                          Modifier le véhicule
                        </h2>
                      </div>
                      <EditVehiclesForm
                        vehicle={selectedVehicle}
                        onSubmit={handleEditVehicle}
                        onCancel={() => {
                          setIsEditModalOpen(false);
                          setSelectedVehicle(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Vehicles;
