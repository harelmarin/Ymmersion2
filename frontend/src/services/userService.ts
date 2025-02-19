import { UserData } from '../types/userData';
import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';

  export const UserService = {
    getUserById: async (id: string): Promise<UserData> => {
      return apiClient<UserData>(`/user/${id}`);
    },
  }

  export const getUserById = (id: string, p0: { enabled: boolean; }) => {
    return useQuery<UserData>({
      queryKey: ['user', id],
      queryFn: () => UserService.getUserById(id),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  };
  