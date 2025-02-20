import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllClients } from "../services/clientService";
import { useAuth } from "../features/auth/authContext";
import { postTransaction } from "../services/transactionService";
import { fetchVehicle, updateVehiculeAvailability } from "../services/vehicleService";

const Transaction = () => {
  const { vehicleId } = useParams();
  const { data: vehicle } = fetchVehicle(vehicleId || "");
  const { data: clients } = fetchAllClients();
  const { user } = useAuth();
  const mutation = postTransaction();
  const mutationUpdateVehicle = updateVehiculeAvailability(vehicleId || "", false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [price, setPrice] = useState(vehicle?.price || 0); // Ajout d'un état local pour le prix

  const handleTransaction = () => {
    if (!selectedClient || !user?.id || !vehicleId) {
      alert("Veuillez sélectionner un client et vérifier les données.");
      return;
    }

    const transactionData = {
      userId: selectedClient,
      vehicleId: parseInt(vehicleId),
      employeeId: parseFloat(user.id),
      transactionType: "purchase",
      amount: price, // Utilisation du prix modifié
      transactionDate: new Date().toISOString(),
    };

    mutation.mutate(transactionData, {
      onSuccess: () => {
        alert("Transaction effectuée avec succès !");
        mutationUpdateVehicle.mutate(false, {
          onSuccess: () => {
            alert("Véhicule vendu avec succès !");
          },
          onError: (error) => {
            console.error("Erreur de mutation :", error);
            alert("Erreur : " + error.message);
          },
        });
      },
      onError: (error) => {
        console.error("Erreur de mutation :", error);
        alert("Erreur : " + error.message);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Nouvelle Transaction
      </h1>

      {/* Card principale */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Sélection client */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Sélectionner un client :
          </label>
          <select
            className="w-full border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
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

        {/* Informations sur le véhicule */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-gray-600">
            <strong>Véhicule ID :</strong> {vehicleId}
          </p>
          <p className="text-gray-600">
            <strong>Employé ID :</strong> {user?.id}
          </p>

          {/* Champ de prix modifiable */}
          <div className="mt-3">
            <label className="block text-gray-700 font-medium mb-1">
              Prix du véhicule (€) :
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* Bouton de validation */}
        <button
          onClick={handleTransaction}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Valider la transaction
        </button>
      </div>
    </div>
  );
};

export default Transaction;
