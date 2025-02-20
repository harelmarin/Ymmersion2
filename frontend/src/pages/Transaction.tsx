import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllClients } from "../services/clientService";
import { useAuth } from "../features/auth/authContext";
import { postTransaction } from "../services/transactionService";
import { fetchVehicle } from "../services/vehicleService";
import { updateVehiculeAvailability } from "../services/vehicleService";

const Transaction = () => {
  const { vehicleId } = useParams();
  const { data: vehicle } = fetchVehicle(vehicleId || '');
  const { data: clients } = fetchAllClients();
  const { user } = useAuth();
  const mutation = postTransaction();
  const mutationUpdateVehicle = updateVehiculeAvailability(vehicleId || '', false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

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
      amount: vehicle?.price ?? 0,
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

      }
      ,
      onError: (error) => {
        console.error("Erreur de mutation :", error);
        alert("Erreur : " + error.message);
      },
    });

  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nouvelle Transaction</h1>

      <label className="block mb-2">Sélectionner un client :</label>
      <select
        className="border p-2 rounded"
        onChange={(e) => setSelectedClient(parseInt(e.target.value))}
      >
        <option value="">-- Choisir un client --</option>
        {clients?.map((client) => (
          <option key={client.id} value={client.id}>
            {client.firstName} {client.lastName}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p>Véhicule ID : {vehicleId}</p>
        <p>Employé ID : {user?.id}</p>
      </div>

      <button
        onClick={handleTransaction}
        className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
      >
        Valider la transaction
      </button>
    </div>
  );
};

export default Transaction;
