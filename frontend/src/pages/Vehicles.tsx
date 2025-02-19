import React, { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import {
  fetchAllVehicle,
  CreateVehicle,
  DeleteVehicle,
} from '../services/vehicleService';
import AddVehiclesForm from '../components/form/AddVehiclesForm';
import VehicleCard from '../components/card/VehicleCard';
import { VehicleData } from '../types/vehicleData';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const { data: vehicles, isLoading, refetch } = fetchAllVehicle();
  const createVehicleMutation = CreateVehicle();
  const deleteVehicleMutation = DeleteVehicle();
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [mileageRange, setMileageRange] = useState({ min: '', max: '' });
  const [rentalFilter, setRentalFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
              new Date(b.addedAt || 0).getTime() -
              new Date(a.addedAt || 0).getTime()
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
