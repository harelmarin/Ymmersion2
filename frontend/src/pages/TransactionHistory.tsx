import { useParams, Link } from 'react-router-dom';
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
              <Link
                to={`/transaction/${transaction.id}/details`}
                key={transaction.id}
              >
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="flex justify-between items-center">
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
                        ).toLocaleDateString('fr-FR')}
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
                </div>
              </Link>
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
