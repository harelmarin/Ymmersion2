// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/authContext';
import { getUserById } from '../services/userService';
import Navbar from '../components/Navbar';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const data = await getUserById(user.id);
        setUserData(data);
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div className="text-center text-xl mt-10">Chargement...</div>;
  }

  return (
    <>
        <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Mon compte</h1>
        
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Nom :</span> {userData.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Email :</span> {userData.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Téléphone :</span> 
            {userData.phone || <span className="italic text-gray-500"> Pas de numéro de téléphone associé</span>}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Adresse :</span> 
            {userData.address || <span className="italic text-gray-500"> Pas d'adresse associée</span>}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
