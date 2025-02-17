import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { VehicleData } from '../types/vehicleData';

export const VehicleService = {
  getAllVehicle: async (): Promise<VehicleData[]> => {
    return apiClient<VehicleData[]>('/vehicle');
  },

  getVehicle: async (id: string): Promise<VehicleData> => {
    return apiClient<VehicleData>(`/vehicle/${id}`);
  },

  createVehicle: async (vehicle: VehicleData): Promise<VehicleData> => {
    return apiClient<VehicleData>('/vehicle', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    });
  },

  updateVehicle: async (
    id: string,
    vehicle: VehicleData,
  ): Promise<VehicleData> => {
    return apiClient<VehicleData>(`/vehicle/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    });
  },

  deleteVehicle: async (id: string): Promise<VehicleData> => {
    return apiClient<VehicleData>(`/vehicle/${id}`, {
      method: 'DELETE',
    });
  },

  getVehicleCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/count');
  },

  getNewVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/count-new');
  },

  getUsedVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/count-used');
  },
};

export const fetchAllVehicle = () => {
  return useQuery<VehicleData[]>({
    queryKey: ['vehicle'],
    queryFn: VehicleService.getAllVehicle,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const fetchVehicle = (id: string) => {
  return useQuery<VehicleData>({
    queryKey: ['vehicle', id],
    queryFn: () => VehicleService.getVehicle(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const createVehicle = () => {
  return useMutation<VehicleData, Error, VehicleData>({
    mutationFn: VehicleService.createVehicle,
  });
};

export const updateVehicle = () => {
  return useMutation<VehicleData, Error, { id: string; vehicle: VehicleData }>({
    mutationFn: ({ id, vehicle }) => VehicleService.updateVehicle(id, vehicle),
  });
};

export const GetVehicleCount = () => {
  return useQuery<number>({
    queryKey: ['vehicleCount'],
    queryFn: VehicleService.getVehicleCount,
  });
};

export const GetNewVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['newVehiclesCount'],
    queryFn: VehicleService.getNewVehiclesCount,
  });
};

export const GetUsedVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['usedVehiclesCount'],
    queryFn: VehicleService.getUsedVehiclesCount,
  });
};
