import { apiClient } from './api/apiClient';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profile_pic?: string;
}

export const ProfileService = {
  getProfile: async (userId: string): Promise<UserData> => {
    return apiClient<UserData>(`/user/${userId}`);
  },

  updateProfile: async (userId: string, data: Partial<UserData>): Promise<UserData> => {
    return apiClient<UserData>(`/user/${userId}`, {
      method: 'PATCH',
      body: data,
    });
  },

  uploadProfilePicture: async (userId: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`http://localhost:3000/user/${userId}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement de la photo de profil');
    }

    return response.json();
  },
};
