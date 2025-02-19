import React from 'react';
import { useNavigate } from 'react-router-dom';
interface SearchResultsProps {
  searchTerm: string;
  clients?: Array<{
    id: string | number;
    firstName: string;
    lastName: string;
    email?: string | null;
    phoneNumber?: string | null;
  }>;
  vehicles?: Array<{
    id?: string | number;
    brand: string;
    model: string;
    version: string;
    price: number;
  }>;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  clients,
  vehicles,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleViewTransactionHistory = async (id: string) => {
    navigate(`/transaction/user/${id}`);
  };

  if (!searchTerm) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
      {clients && clients.length > 0 && (
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Clients</h3>
          <div className="space-y-2">
            {clients.map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  handleViewTransactionHistory(client.id.toString());
                  onClose();
                }}
                className="flex items-center justify-between p-2 hover:bg-blue-50 rounded-lg cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {client.firstName} {client.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {client.email} • {client.phoneNumber}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {vehicles && vehicles.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            Véhicules
          </h3>
          <div className="space-y-2">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => {
                  navigate(`/vehicles/${vehicle.id}`);
                  onClose();
                }}
                className="flex items-center justify-between p-2 hover:bg-blue-50 rounded-lg cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {vehicle.brand} {vehicle.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {vehicle.version} • {vehicle.price.toLocaleString()} €
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {!clients?.length && !vehicles?.length && (
        <div className="p-4 text-center text-gray-500">
          Aucun résultat trouvé pour "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchResults;
