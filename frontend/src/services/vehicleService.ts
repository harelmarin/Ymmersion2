import { apiClient } from './api/apiClient';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { VehicleData } from '../types/vehicleData';
import { VehicleOption } from '../types/vehicleData';

export const VehicleService = {
  getAllVehicle: async (): Promise<VehicleData[]> => {
    return apiClient<VehicleData[]>('/vehicle');
  },

  getVehicle: async (id: string): Promise<VehicleData> => {
    return apiClient<VehicleData>(`/vehicle/${id}`);
  },

  createVehicle: async (vehicle: VehicleData): Promise<VehicleData> => {
    const { options, ...rest } = vehicle;

    const formattedVehicle = {
      ...rest,
      price: Number(vehicle.price),
      mileage: Number(vehicle.mileage),
      fees: Number(vehicle.fees),
      purchasePrice: Number(vehicle.purchasePrice),
      options: options.map((opt) => opt.name),
    };

    return apiClient<VehicleData>('/vehicle', {
      method: 'POST',
      body: formattedVehicle,
    });
  },

  updateVehicle: async (
    id: string,
    vehicle: VehicleData,
  ): Promise<VehicleData> => {
    const { options, ...rest } = vehicle;

    const formattedVehicle = {
      ...rest,
      price: Number(vehicle.price),
      mileage: Number(vehicle.mileage),
      fees: Number(vehicle.fees),
      purchasePrice: Number(vehicle.purchasePrice),
      options: options.map((opt) => opt.name),
    };

    return apiClient<VehicleData>(`/vehicle/${id}`, {
      method: 'PATCH',
      body: formattedVehicle,
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

  getLastAddedVehicles: async (): Promise<VehicleData[]> => {
    return apiClient<VehicleData[]>('/vehicle/last-added');
  },

  getAllVehicleOptions: async (): Promise<VehicleOption[]> => {
    return apiClient<VehicleOption[]>('/vehicle/vehicle-options');
  },

  getVehicleOptions: async (vehicleId: string): Promise<VehicleOption[]> => {
    return apiClient<VehicleOption[]>(`/vehicle/vehicle-options/${vehicleId}`);
  },

  getAvailableVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/available-vehicles-count');
  },

  getAvailableNewVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/available-new-vehicles-count');
  },

  getAvailableUsedVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/available-used-vehicles-count');
  },

  updateVehiculeAvailability: async (
    id: string,
    availability: boolean,
  ): Promise<VehicleData> => {
    return apiClient<VehicleData>(`/vehicle/${id}`, {
      method: 'PATCH',
      body: { available: availability },
    });
  },

  getSoldVehiclesCount: async (): Promise<number> => {
    return apiClient<number>('/vehicle/sold-vehicles-count');
  },
};

export const updateVehiculeAvailability = (
  id: string,
  availability: boolean,
) => {
  const queryClient = new QueryClient();
  return useMutation<VehicleData, Error, boolean>({
    mutationFn: (availability: boolean) =>
      VehicleService.updateVehiculeAvailability(id, availability),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle'] });
    },
  });
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

export const CreateVehicle = () => {
  return useMutation<VehicleData, Error, VehicleData>({
    mutationFn: (data: VehicleData) =>
      VehicleService.createVehicle({
        ...data,
        available: true,
        addedAt: new Date().toISOString(),
      }),
  });
};

export const updateVehicle = (id: string, data: VehicleData) => {
  return useMutation<VehicleData, Error, VehicleData>({
    mutationFn: (data: VehicleData) => VehicleService.updateVehicle(id, data),
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

export const DeleteVehicle = () => {
  return useMutation<VehicleData, Error, string>({
    mutationFn: (id: string) => VehicleService.deleteVehicle(id),
  });
};

export const GetLastAddedVehicle = () => {
  return useQuery<VehicleData[]>({
    queryKey: ['lastAddedVehicles'],
    queryFn: VehicleService.getLastAddedVehicles,
  });
};

export const getAllVehicleOptions = () => {
  return useQuery<VehicleOption[]>({
    queryKey: ['vehicleOptions'],
    queryFn: VehicleService.getAllVehicleOptions,
  });
};

export const getVehicleOptions = (id: string) => {
  return useQuery<VehicleOption[]>({
    queryKey: ['vehicleOptions', id],
    queryFn: () => VehicleService.getVehicleOptions(id),
  });
};
export const GetSoldVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['soldVehiclesCount'],
    queryFn: VehicleService.getSoldVehiclesCount,
  });
};

export const GetAvailableVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['availableVehiclesCount'],
    queryFn: VehicleService.getAvailableVehiclesCount,
  });
};

export const GetAvailableNewVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['availableNewVehiclesCount'],
    queryFn: VehicleService.getAvailableNewVehiclesCount,
  });
};

export const GetAvailableUsedVehiclesCount = () => {
  return useQuery<number>({
    queryKey: ['availableUsedVehiclesCount'],
    queryFn: VehicleService.getAvailableUsedVehiclesCount,
  });
};
