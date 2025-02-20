import React from 'react';
import { GetLastAddedClient } from '../../services/clientService';
import { useNavigate } from 'react-router-dom';

const RecentClient = () => {
  const { data: lastAddedClient } = GetLastAddedClient();
  const navigate = useNavigate();

  const handleClientClick = (userId: string) => {
    navigate(`/transaction/user/${userId}`, {
      state: {
        timestamp: new Date().getTime(),
      },
      replace: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-600">Derniers clients inscrits</h3>
        <a
          href="/clients"
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          Voir tout
        </a>
      </div>
      <div className="space-y-0">
        {lastAddedClient?.map((client, index) => (
          <div
            key={client.id}
            onClick={() => handleClientClick(client.id)}
            style={{
              backgroundColor: index % 2 === 0 ? '#EEF2FF' : 'white',
            }}
            className="shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer hover:bg-blue-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  {client.firstName} {client.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>{client.email}</span>
                  <span>•</span>
                  <span>{client.phoneNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Nouveau
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClient;
