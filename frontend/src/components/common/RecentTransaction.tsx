import React from "react";
import { fetchAllTransaction } from "../../services/transactionService";

const RecentTransaction = () => {
  const { data: lastTransaction, refetch: refetchLastVehicles } =
    fetchAllTransaction();

  console.log(lastTransaction, "data");

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-600">Dernières transactions</h3>
        <a
          href="/transactions"
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          Voir tout
        </a>
      </div>
      <div className="space-y-0">
        {lastTransaction?.map((transaction, index) => (
          <div
            key={transaction.id}
            style={{
              backgroundColor: index % 2 === 0 ? "#F2F6FE" : "white",
            }}
            className="shadow-sm hover:shadow-md transition-all duration-200 p-4 "
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="col-span-2 md:col-span-1">
                <p className="font-semibold text-lg">
                  {transaction.transactionType === "purchase" ? "Achat" : "Vente"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Montant :</p>
                <p className="text-lg font-semibold text-gray-900">
                  {transaction.amount}€
                </p>
              </div>

              {transaction.user && (
                <div className="relative flex flex-col">
                  <p className="text-sm text-gray-500">Client :</p>
                  <p className="text-lg font-semibold text-gray-900 group inline-block relative cursor-pointer">
                    {transaction.user.firstName} {transaction.user.lastName}
                    <div className="absolute left-0 top-full  hidden group-hover:block bg-white border border-gray-300 p-3 rounded shadow-lg w-56 z-100">
                      <p className="text-gray-700">
                        📍 {transaction.user.address}
                      </p>
                      <p className="text-gray-700">
                        📞 {transaction.user.phoneNumber}
                      </p>
                    </div>
                  </p>
                </div>
              )}

              {transaction.vehicle && (
                <div className="relative flex flex-col">
                  <p className="text-sm text-gray-500">Vehicle :</p>
                  <p className="text-lg font-semibold text-gray-900 group inline-block relative cursor-pointer">
                    {transaction.vehicle.brand} {transaction.vehicle.model}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
