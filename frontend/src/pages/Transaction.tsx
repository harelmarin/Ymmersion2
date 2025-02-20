import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAllClients } from '../services/clientService';
import { useAuth } from '../features/auth/authContext';
import { postTransaction } from '../services/transactionService';
import {
  fetchVehicle,
  updateVehiculeAvailability,
} from '../services/vehicleService';
import Navbar from '../components/common/Navbar';
const Transaction = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { data: vehicle } = fetchVehicle(vehicleId || '');
  const { data: clients } = fetchAllClients();
  const { user } = useAuth();
  const mutation = postTransaction();
  const mutationUpdateVehicle = updateVehiculeAvailability(
    vehicleId || '',
    false,
  );
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [price, setPrice] = useState(vehicle?.price || 0);

  const handleTransaction = () => {
    if (!selectedClient || !user?.id || !vehicleId) {
      alert('Veuillez sélectionner un client et vérifier les données.');
      return;
    }

    const transactionData = {
      userId: selectedClient,
      vehicleId: parseInt(vehicleId),
      employeeId: parseFloat(user.id),
      transactionType: 'purchase',
      amount: price,
      transactionDate: new Date().toISOString(),
    };

    mutation.mutate(transactionData, {
      onSuccess: () => {
        mutationUpdateVehicle.mutate(false, {
          onSuccess: () => {
            alert('Véhicule vendu avec succès !');
            navigate('/');
          },
          onError: (error) => {
            console.error('Erreur de mutation :', error);
            alert('Erreur : ' + error.message);
          },
        });
      },
      onError: (error) => {
        console.error('Erreur de mutation :', error);
        alert('Erreur : ' + error.message);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Nouvelle Transaction
          </h1>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Sélectionner un client :
                </label>
                <select
                  className="mt-2 block w-full px-4 py-3 text-base border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) => setSelectedClient(parseInt(e.target.value))}
                >
                  <option value="">-- Choisir un client --</option>
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Véhicule ID :</span> {vehicleId}
                </p>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Prix du véhicule (€) :
                  </label>
                  <input
                    type="number"
                    className="mt-2 block w-full px-4 py-3 text-base border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <button
                onClick={handleTransaction}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Valider la transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
