import React from 'react';
import {
  GetVehicleCount,
  GetNewVehiclesCount,
  GetUsedVehiclesCount,
} from '../../services/vehicleService';

import { GetClientCount } from '../../services/clientService';
import { fetchStatisticsByMonth } from '../../services/statisticService';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const navigate = useNavigate();
  const {
    data: vehicleCount,
    isLoading: isLoadingVehicleCount,
    error: errorVehicleCount,
  } = GetVehicleCount();
  const {
    data: newVehiclesCount,
    isLoading: isLoadingNewVehiclesCount,
    error: errorNewVehiclesCount,
  } = GetNewVehiclesCount();
  const {
    data: usedVehiclesCount,
    isLoading: isLoadingUsedVehiclesCount,
    error: errorUsedVehiclesCount,
  } = GetUsedVehiclesCount();
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
    isLoadingClientCount
  ) {
    return <div>Chargement...</div>;
  }

  if (
    errorVehicleCount ||
    errorNewVehiclesCount ||
    errorUsedVehiclesCount ||
    errorClientCount
  ) {
    return <div>Erreur de chargement des données.</div>;
  }

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow  hover:cursor-pointer"
          onClick={() => navigate('/vehicles')}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Véhicules en stock
          </h3>
          <p className="text-2xl font-bold text-blue-600">{vehicleCount}</p>
          <p className="text-xs text-gray-500 mt-2">
            {newVehiclesCount} neufs, {usedVehiclesCount} occasions
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ">
          <h3 className="text-sm font-medium text-gray-500">Ventes du mois</h3>
          <p className="text-2xl font-bold text-blue-600">
            {' '}
            {statisticCount?.vehiclesSold}
          </p>
          <p className="text-xs text-green-500 mt-2">+20% vs mois dernier</p>
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
            Chiffre d'affaires du mois
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {statisticCount?.totalSales}€
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
