import React from 'react';
import { GetLastAddedVehicle } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';

const RecentVehicle = () => {
  const { data: lastVehicles } = GetLastAddedVehicle();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-600">Derniers véhicules ajoutés</h3>
        <a
          href="/vehicles"
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          Voir tout
        </a>
      </div>
      <div className="space-y-0">
        {lastVehicles?.map((vehicle, index) => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            style={{
              backgroundColor: index % 2 === 0 ? '#EEF2FF' : 'white',
            }}
            className="shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer hover:bg-blue-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  {vehicle.brand} {vehicle.model}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{vehicle.version}</span>
                  <span>•</span>
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                  <span>•</span>
                  <span className="font-semibold text-blue-600">
                    {vehicle.price.toLocaleString()} €
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    vehicle.condition === 'new'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {vehicle.condition === 'new' ? 'Neuf' : 'Occasion'}
                </span>
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

export default RecentVehicle;
