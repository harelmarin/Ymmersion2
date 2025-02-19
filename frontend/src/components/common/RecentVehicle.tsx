import React from "react";
import { GetLastAddedVehicle } from "../../services/vehicleService";

const RecentVehicle = () => {

  const { data: lastVehicles, refetch: refetchLastVehicles } =
    GetLastAddedVehicle();

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-600">Véhicules récents</h3>
        <a
          href="/vehicles"
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          Voir tout
        </a>
      </div>
      <div className="divide-y divide-gray-200">
        {lastVehicles?.map((vehicle) => (
          <div key={vehicle.id} className="py-4">
            <div className="hover:bg-gray-50 rounded-lg transition-colors p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {vehicle.brand} {vehicle.model}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {vehicle.version}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${vehicle.condition === 'new'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                      }`}
                  >
                    {vehicle.condition === 'new'
                      ? 'Neuf'
                      : 'Occasion'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Kilométrage
                    </p>
                    <p className="font-medium">
                      {vehicle.mileage.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium text-blue-600">
                      {vehicle.price.toLocaleString()} €
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">VIN: </span>
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                      {vehicle.vin}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Plaque: </span>
                    <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded text-blue-700">
                      {vehicle.licensePlate}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {vehicle.options?.map((option, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {vehicle.isRental && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        Location
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {new Date(vehicle.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentVehicle;