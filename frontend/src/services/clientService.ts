import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ClientData } from '../types/clientData';

export const ClientService = {
  getAllClients: async (): Promise<ClientData[]> => {
    return apiClient<ClientData[]>('/client');
  },

  getClient: async (id: string): Promise<ClientData> => {
    return apiClient<ClientData>(`/client/${id}`);
  },

  createClient: async (client: ClientData): Promise<ClientData> => {
    return apiClient<ClientData>('/client', {
      method: 'POST',
      body: client,
    });
  },

  updateClient: async (id: string, client: ClientData): Promise<ClientData> => {
    return apiClient<ClientData>(`/client/${id}`, {
      method: 'PATCH',
      body: client,
    });
  },

  deleteClient: async (id: string): Promise<ClientData> => {
    return apiClient<ClientData>(`/client/${id}`, {
      method: 'DELETE',
    });
  },

  getClientCount: async (): Promise<number> => {
    return apiClient<number>('/client/count');
  },

  getLastAddedClient: async (): Promise<ClientData[]> => {
    return apiClient<ClientData[]>('/client/last-added');
  },
};

export const fetchAllClients = () => {
  return useQuery<ClientData[]>({
    queryKey: ['clients'],
    queryFn: ClientService.getAllClients,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const CreateClient = () => {
  return useMutation<ClientData, Error, ClientData>({
    mutationFn: (data: ClientData) => ClientService.createClient(data),
  });
};

export const updateClient = () => {
  return useMutation<ClientData, Error, ClientData>({
    mutationFn: (data: ClientData) => ClientService.updateClient(data.id, data),
  });
};

export const DeleteClient = () => {
  return useMutation<ClientData, Error, string>({
    mutationFn: (id: string) => ClientService.deleteClient(id),
  });
};

export const GetClientCount = () => {
  return useQuery<number>({
    queryKey: ['clientCount'],
    queryFn: ClientService.getClientCount,
  });
};

export const GetLastAddedClient = () => {
  return useQuery<ClientData[]>({
    queryKey: ['lastAddedClient'],
    queryFn: ClientService.getLastAddedClient,
  });
};
