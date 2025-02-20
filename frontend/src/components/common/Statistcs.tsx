import React from 'react';
import {
  GetAvailableVehiclesCount,
  GetAvailableNewVehiclesCount,
  GetAvailableUsedVehiclesCount,
  GetSoldVehiclesCount,
} from '../../services/vehicleService';
import { GetClientCount } from '../../services/clientService';
import { fetchStatisticsByMonth } from '../../services/statisticService';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const navigate = useNavigate();

  const {
    data: availableVehicleCount,
    isLoading: isLoadingVehicleCount,
    error: errorVehicleCount,
  } = GetAvailableVehiclesCount();

  const {
    data: newVehiclesCount,
    isLoading: isLoadingNewVehiclesCount,
    error: errorNewVehiclesCount,
  } = GetAvailableNewVehiclesCount();

  const {
    data: usedVehiclesCount,
    isLoading: isLoadingUsedVehiclesCount,
    error: errorUsedVehiclesCount,
  } = GetAvailableUsedVehiclesCount();

  const {
    data: soldVehiclesCount,
    isLoading: isLoadingSoldVehiclesCount,
    error: errorSoldVehiclesCount,
  } = GetSoldVehiclesCount();

  const {
    data: clientCount,
    isLoading: isLoadingClientCount,
    error: errorClientCount,
  } = GetClientCount();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const {
    data: statisticCount,
    isLoading: isLoadingStatisticCount,
    error: errorStatisticCount,
  } = fetchStatisticsByMonth(currentMonth, currentYear);

  if (
    isLoadingVehicleCount ||
    isLoadingNewVehiclesCount ||
    isLoadingUsedVehiclesCount ||
    isLoadingClientCount ||
    isLoadingSoldVehiclesCount
  ) {
    return <div>Chargement...</div>;
  }

  if (
    errorVehicleCount ||
    errorNewVehiclesCount ||
    errorUsedVehiclesCount ||
    errorClientCount ||
    errorSoldVehiclesCount
  ) {
    return <div>Erreur de chargement des données.</div>;
  }

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer"
          onClick={() => navigate('/vehicles')}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Véhicules disponibles
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {availableVehicleCount}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {newVehiclesCount} neufs, {usedVehiclesCount} occasions
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer"
          onClick={() => navigate('/vehicles?filter=sold')}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Véhicules vendus
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {soldVehiclesCount}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Total des ventes réalisées
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer"
          onClick={() => navigate('/clients')}
        >
          <h3 className="text-sm font-medium text-gray-500">Clients</h3>
          <p className="text-2xl font-bold text-blue-600">{clientCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Taux de conversion
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {soldVehiclesCount && availableVehicleCount
              ? Math.round(
                  (soldVehiclesCount /
                    (soldVehiclesCount + availableVehicleCount)) *
                    100,
                )
              : 0}
            %
          </p>
          <p className="text-xs text-gray-500 mt-2">Ratio ventes/stock total</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
