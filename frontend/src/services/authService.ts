import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginData, RegisterData } from '../types/authData';

const BASE_URL = 'http://localhost:3000/auth';

const AuthService = {
  async login(formData: LoginData) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return await response.json();
  },

  async register(formData: RegisterData) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return await response.json();
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return await response.json();
  },

  async me() {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return await response.json();
  },
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => AuthService.login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      // Attendre que les données soient revalidées
      await queryClient.refetchQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => AuthService.register(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthService.logout(),
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => AuthService.me(),
    retry: false,
  });
};

export default AuthService;
