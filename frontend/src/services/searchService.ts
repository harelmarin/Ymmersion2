import { useQuery } from '@tanstack/react-query';
import { fetchAllVehicle } from './vehicleService';
import { fetchAllClients } from './clientService';

export const useSearchClients = (searchTerm: string) => {
  const { data: clients } = fetchAllClients();

  const filteredClients =
    clients?.filter(
      (client) =>
        searchTerm.length > 2 &&
        (client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || [];

  return { data: filteredClients };
};

export const useSearchVehicles = (searchTerm: string) => {
  const { data: vehicles } = fetchAllVehicle();

  const filteredVehicles =
    vehicles?.filter(
      (vehicle) =>
        searchTerm.length > 2 &&
        (vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || [];

  return { data: filteredVehicles };
};
