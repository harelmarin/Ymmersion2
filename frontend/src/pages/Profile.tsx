import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../features/auth/authContext';
import Navbar from '../components/common/Navbar';
import { UserPen, KeyRound, Check, X } from 'lucide-react';
import { ProfileService, UserData } from '../services/profileService';

const Profile = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ['profile', userId],
    queryFn: () => ProfileService.getProfile(userId ?? ''),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userData && !isEditing) {
      setEditedData({
        name: userData.name ?? '',
        email: userData.email ?? '',
        phone: userData.phone ?? '',
        address: userData.address ?? '',
      });
    }
  }, [userData, isEditing]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<UserData>) =>
      ProfileService.updateProfile(userId!, data),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      }
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour du profil :', error);
    },
  });

  const uploadPictureMutation = useMutation({
    mutationFn: (file: File) =>
      ProfileService.uploadProfilePicture(userId!, file),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      }
      setSelectedFile(null);
    },
    onError: (error) => {
      console.error(
        'Erreur lors de la mise à jour de la photo de profil :',
        error,
      );
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile && userId) {
      uploadPictureMutation.mutate(selectedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (userId) {
      updateProfileMutation.mutate(editedData);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setEditedData({
        name: userData.name ?? '',
        email: userData.email ?? '',
        phone: userData.phone ?? '',
        address: userData.address ?? '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-700">
        Chargement...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-700">
        Aucune donnée utilisateur trouvée
      </div>
    );
  }

  const profilePicUrl = userData.profile_pic
    ? `http://localhost:3000/files/${userData.profile_pic}`
    : 'http://localhost:3000/files/default.jpg';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-1/3 bg-gray-300 flex items-center justify-center p-6">
              <div className="relative">
                <img
                  src={profilePicUrl}
                  alt="Profil"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-gray-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition hover:cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l3 3 6-6M4 20h4l10-10a2.828 2.828 0 00-4-4L4 16v4z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
                {isEditing ? (
                  <div className="flex flex-wrap space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-400 text-white rounded-2xl hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <Check />
                      Sauvegarder
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-red-400 text-white rounded-2xl hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <X />
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-400 text-white rounded-2xl hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <UserPen />
                    Modifier Profil
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium">Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">
                      {userData.phone ? (
                        userData.phone
                      ) : (
                        <span className="text-gray-500">Non renseigné</span>
                      )}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Adresse
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">
                      {userData.address ? (
                        userData.address
                      ) : (
                        <span className="text-gray-500">Non renseignée</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="mt-4">
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    Mettre à jour la photo
                  </button>
                </div>
              )}

              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-400 text-white rounded-2xl hover:bg-blue-600 transition flex items-center gap-2">
                  <KeyRound />
                  Modifier mon mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
