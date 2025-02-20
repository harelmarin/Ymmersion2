import React, { useState } from 'react';
import { fetchAllTransaction } from '../services/transactionService';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';

const AllTransactions = () => {
  const { data: transactions, isLoading, error } = fetchAllTransaction();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les transactions
  const filteredTransactions = transactions?.filter((transaction) => {
    const fullName =
      `${transaction.user?.firstName} ${transaction.user?.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue: {error.message}</div>;
  }

  console.log(transactions);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">
              Toutes les Transactions
            </h1>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Rechercher par nom de client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredTransactions?.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() =>
                  navigate(`/transaction/${transaction.id}/details`)
                }
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 hover:cursor-pointer"
              >
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
                      {new Date(transaction.transactionDate).toLocaleDateString(
                        'fr-FR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                    </p>
                    {transaction.userId && (
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          Client: {transaction.user?.firstName}{' '}
                          {transaction.user?.lastName}
                        </p>
                        <p className="text-gray-600 blur-sm hover:blur-none transition-all duration-200">
                          Email: {transaction.user?.email}
                        </p>
                        <p className="text-gray-600 blur-sm hover:blur-none transition-all duration-200">
                          Tél: {transaction.user?.phoneNumber}
                        </p>
                        <p className="text-gray-600 blur-sm hover:blur-none transition-all duration-200">
                          Adresse: {transaction.user?.address}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      transaction.transactionType === 'purchase'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.amount.toLocaleString('fr-FR')} €
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions?.length === 0 && (
            <p className="text-center text-gray-500 p-4 bg-white rounded-lg shadow-sm">
              Aucune transaction trouvée
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTransactions;
