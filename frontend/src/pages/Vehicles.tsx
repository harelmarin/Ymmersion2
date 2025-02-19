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

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = async (data: VehicleData) => {
    await onEdit(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 hover:shadow-xl transition-all">
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne 1: Informations principales */}
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
                <span className="text-gray-600">Matricule:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {vehicle.internalId}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Plaque:</span>
                <span className="font-mono bg-blue-100 px-3 py-1 rounded-lg text-blue-800">
                  {vehicle.licensePlate}
                </span>
              </div>
            </div>
          </div>

          {/* Colonne 2: Détails techniques */}
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

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Options</p>
              <div className="flex flex-wrap gap-2">
                {vehicle.options?.map((option, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {option.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne 3: Informations financières et actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-sm text-gray-600">Prix de vente</p>
                <p className="text-xl font-bold text-blue-600">
                  {vehicle.price.toLocaleString()} €
                </p>
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
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                onClick={() => onDelete(vehicle.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      ) : (
        <div className="mt-4">
          <EditVehiclesForm
            vehicle={vehicle}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
};

const Vehicles = () => {
  const { data: vehicles, isLoading, refetch } = fetchAllVehicle();
  const createVehicleMutation = CreateVehicle();
  const updateVehicleMutation = updateVehicle();
  const deleteVehicleMutation = DeleteVehicle();
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [mileageRange, setMileageRange] = useState({ min: '', max: '' });
  const [rentalFilter, setRentalFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
    null,
  );

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];

    return vehicles
      .filter((vehicle) => {
        const searchFields = [
          vehicle.brand,
          vehicle.model,
          vehicle.version,
          vehicle.licensePlate,
          vehicle.vin,
          vehicle.internalId,
        ].map((field) => field.toLowerCase());

        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every((term) =>
          searchFields.some((field) => field.includes(term)),
        );
      })
      .filter(
        (vehicle) =>
          !brandFilter ||
          vehicle.brand.toLowerCase() === brandFilter.toLowerCase(),
      )
      .filter(
        (vehicle) => !conditionFilter || vehicle.condition === conditionFilter,
      )
      .filter(
        (vehicle) =>
          !rentalFilter || vehicle.isRental === (rentalFilter === 'true'),
      )
      .filter(
        (vehicle) => !priceRange.min || vehicle.price >= Number(priceRange.min),
      )
      .filter(
        (vehicle) => !priceRange.max || vehicle.price <= Number(priceRange.max),
      )
      .filter(
        (vehicle) =>
          !mileageRange.min || vehicle.mileage >= Number(mileageRange.min),
      )
      .filter(
        (vehicle) =>
          !mileageRange.max || vehicle.mileage <= Number(mileageRange.max),
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'mileage_asc':
            return a.mileage - b.mileage;
          case 'mileage_desc':
            return b.mileage - a.mileage;
          case 'newest':
            return (
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
            );
          default:
            return 0;
        }
      });
  }, [
    vehicles,
    searchTerm,
    brandFilter,
    conditionFilter,
    priceRange,
    mileageRange,
    rentalFilter,
    sortBy,
  ]);

  const uniqueBrands = useMemo(() => {
    if (!vehicles) return [];
    return [...new Set(vehicles.map((v) => v.brand))].sort();
  }, [vehicles]);

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

  const handleEditVehicle = async (updatedVehicle: VehicleData) => {
    try {
      await updateVehicleMutation.mutateAsync(updatedVehicle);
      setSelectedVehicle(null);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la modification du véhicule:', error);
    }
  };

  const handledeleteVehicle = async (id: string) => {
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
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[85%] mx-auto max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-700">
                {' '}
                Gestion des Véhicules
              </h1>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <span className="mr-2">+</span> Ajouter un véhicule
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recherche
                  </label>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marque
                  </label>
                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Toutes les marques</option>
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

             
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    État
                  </label>
                  <select
                    value={conditionFilter}
                    onChange={(e) => setConditionFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les états</option>
                    <option value="new">Neuf</option>
                    <option value="used">Occasion</option>
                  </select>
                </div>

             
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={rentalFilter}
                    onChange={(e) => setRentalFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous</option>
                    <option value="true">Location</option>
                    <option value="false">Vente</option>
                  </select>
                </div>

         
                <div className="flex space-x-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix min
                    </label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Min €"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix max
                    </label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Max €"
                    />
                  </div>
                </div>

           
                <div className="flex space-x-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Km min
                    </label>
                    <input
                      type="number"
                      value={mileageRange.min}
                      onChange={(e) =>
                        setMileageRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Min km"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Km max
                    </label>
                    <input
                      type="number"
                      value={mileageRange.max}
                      onChange={(e) =>
                        setMileageRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Max km"
                    />
                  </div>
                </div>

       
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trier par
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Par défaut</option>
                    <option value="price_asc">Prix croissant</option>
                    <option value="price_desc">Prix décroissant</option>
                    <option value="mileage_asc">Kilométrage croissant</option>
                    <option value="mileage_desc">
                      Kilométrage décroissant
                    </option>
                    <option value="newest">Plus récent</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-10">Chargement...</div>
            ) : (
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onEdit={handleEditVehicle}
                    onDelete={handledeleteVehicle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehicles;
