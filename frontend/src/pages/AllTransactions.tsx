import React from 'react';
import { fetchAllTransaction } from '../services/transactionService';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';

const AllTransactions = () => {
  const { data: transactions, isLoading, error } = fetchAllTransaction();
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Toutes les Transactions
          </h1>

          <div className="grid gap-4">
            {transactions?.map((transaction) => (
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
                      <p className="text-gray-600">
                        Client: {transaction.user?.firstName}{' '}
                        {transaction.user?.lastName}
                      </p>
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

          {transactions?.length === 0 && (
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
