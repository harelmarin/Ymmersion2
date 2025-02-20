import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import React from 'react';
import { fetchTransactionById } from '../services/transactionService';

const TransactionHistory = () => {
  const { id } = useParams();
  const { data: transactions } = id ? fetchTransactionById(id) : { data: null };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Historique des transactions
          </h1>

          <div className="grid gap-4">
            {transactions?.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-gray-700">
                          Transaction #{transaction.id}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            transaction.transactionType === 'purchase'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.transactionType === 'purchase'
                            ? 'Achat'
                            : 'Vente'}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Date:{' '}
                        {new Date(
                          transaction.transactionDate,
                        ).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <p
                      className={`text-xl font-bold ${
                        transaction.transactionType === 'purchase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.amount.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  {transaction.employee && (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Informations employé
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Nom</p>
                          <p className="font-medium">
                            {transaction.employee.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Email</p>
                          <p className="font-medium">
                            {transaction.employee.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rôle</p>
                          <p className="font-medium">
                            {transaction.employee.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {transaction.vehicle && (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Informations véhicule
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Marque</p>
                          <p className="font-medium">
                            {transaction.vehicle.brand}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Modèle</p>
                          <p className="font-medium">
                            {transaction.vehicle.model}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Année</p>
                          <p className="font-medium">
                            {transaction.vehicle.year}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">État</p>
                          <p className="font-medium">
                            {transaction.vehicle.condition}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Kilométrage</p>
                          <p className="font-medium">
                            {transaction.vehicle.mileage.toLocaleString(
                              'fr-FR',
                            )}{' '}
                            km
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Prix</p>
                          <p className="font-medium">
                            {transaction.vehicle.price.toLocaleString('fr-FR')}{' '}
                            €
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!transactions?.length && (
            <div className="text-center text-gray-500 p-4 bg-white rounded-lg shadow-sm">
              Aucune transaction trouvée
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
