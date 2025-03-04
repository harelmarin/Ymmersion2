import React, { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllClients,
  CreateClient,
  updateClient,
  DeleteClient,
} from '../services/clientService';
import AddClientForm from '../components/form/AddClientForm';
import EditClientForm from '../components/form/EditClientForm';
import { ClientData } from '../types/clientData';

const Clients = () => {
  const { data: clients, isLoading, refetch } = fetchAllClients();
  const createClientMutation = CreateClient();
  const updateClientMutation = updateClient();
  const deleteClientMutation = DeleteClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const filteredClients = useMemo(() => {
    if (!clients) return [];

    return clients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [clients, searchTerm]);

  const handleAddClient = async (formData: ClientData) => {
    try {
      const { id, ...clientDataWithoutId } = formData;

      await createClientMutation.mutateAsync({
        ...clientDataWithoutId,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '',
      });

      setIsAddModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
    }
  };

  const handleEditClient = async (formData: ClientData) => {
    try {
      await updateClientMutation.mutateAsync({
        ...formData,
        id: selectedClient?.id || '',
      });

      setIsEditModalOpen(false);
      setSelectedClient(null);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la modification du client:', error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClientMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
    }
  };

  const navigate = useNavigate();

  const handleViewTransactionHistory = async (id: string) => {
    navigate(`/transaction/user/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-700">
                {' '}
                Gestion des Clients
              </h1>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <span className="mr-2">+</span> Ajouter un client
              </button>
            </div>

            {isAddModalOpen && (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-blue-100">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">
                    Ajouter un nouveau client
                  </h2>
                </div>
                <AddClientForm
                  onSubmit={handleAddClient}
                  onCancel={() => setIsAddModalOpen(false)}
                />
              </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-10">Chargement...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4 ">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow hover:cursor-pointer"
                    onClick={() => handleViewTransactionHistory(client.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {client.firstName} {client.lastName}
                        </h3>
                        <div className="mt-3 space-y-2">
                          <p className="text-lg">
                            Email :{' '}
                            <span className="text-gray-600 blur-sm hover:blur-none transition-all duration-300">
                              {client.email}
                            </span>
                          </p>
                          <p className="text-lg">
                            Numéro de téléphone :{' '}
                            <span className="text-gray-600 blur-sm hover:blur-none transition-all duration-300">
                              {client.phoneNumber || 'Non renseigné'}
                            </span>
                          </p>
                          <p className="text-lg">
                            Adresse :{' '}
                            <span className="text-gray-600 blur-sm hover:blur-none transition-all duration-300">
                              {client.address}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hover:cursor-pointer"
                          onClick={() => {
                            setSelectedClient(client);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors hover:cursor-pointer"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>

                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors hover:cursor-pointer"
                          onClick={() =>
                            handleViewTransactionHistory(client.id)
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-9-9"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {isEditModalOpen && selectedClient?.id === client.id && (
                      <div className="mt-4 bg-white p-6 rounded-lg shadow-lg border-2 border-green-100">
                        <div className="border-b pb-4 mb-4">
                          <h2 className="text-xl font-semibold text-green-600">
                            Modifier le client
                          </h2>
                        </div>
                        <EditClientForm
                          client={selectedClient}
                          onSubmit={handleEditClient}
                          onCancel={() => {
                            setIsEditModalOpen(false);
                            setSelectedClient(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
