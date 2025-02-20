import React from 'react';
import { fetchAllTransaction } from '../../services/transactionService';
import { useNavigate } from 'react-router-dom';

const RecentTransaction = () => {
  const { data: lastTransaction } = fetchAllTransaction();
  const navigate = useNavigate();

  const handleTransactionClick = (transactionId: string) => {
    navigate(`/transaction/${transactionId}`, {
      state: {
        timestamp: new Date().getTime(),
      },
      replace: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-600">Dernières transactions</h3>
        <a
          href="/transaction"
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          Voir tout
        </a>
      </div>
      <div className="space-y-0">
        {lastTransaction?.map((transaction, index) => (
          <div
            key={transaction.id}
            onClick={() => handleTransactionClick(transaction.id.toString())}
            style={{
              backgroundColor: index % 2 === 0 ? '#EEF2FF' : 'white',
            }}
            className="shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer hover:bg-blue-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  {transaction.vehicle?.brand} {transaction.vehicle?.model}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 ">
                  <span className="blur-sm transition-all duration-500 hover:blur-none">
                    {transaction.user?.firstName} {transaction.user?.lastName}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-blue-600">
                    {transaction.amount.toLocaleString()} €
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    transaction.transactionType === 'sale'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {transaction.transactionType === 'sale' ? 'Vente' : 'Achat'}
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

export default RecentTransaction;
