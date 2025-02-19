import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import React from 'react';
import { fetchTransactionById } from '../services/transactionService';

const TransactionHistory = () => {
  const { id } = useParams();
  const { data } = id ? fetchTransactionById(id) : { data: null };
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Transaction History{' '}
        </h1>
        {data?.map((transaction, index) => (
          <div
            key={transaction.id}
            className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Transaction #{index + 1}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Transaction Number:
                  </span>{' '}
                  {transaction.id}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Amount:</span>{' '}
                  {transaction.amount}€
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Transaction Type:
                  </span>{' '}
                  {transaction.transactionType}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Employee Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Name:</span>{' '}
                  {transaction.employee.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Email:</span>{' '}
                  {transaction.employee.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Role:</span>{' '}
                  {transaction.employee.role}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Vehicle Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Brand:</span>{' '}
                  {transaction.vehicle.brand}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Model:</span>{' '}
                  {transaction.vehicle.model}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Year:</span>{' '}
                  {transaction.vehicle.year}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Condition:
                  </span>{' '}
                  {transaction.vehicle.condition}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Mileage:</span>{' '}
                  {transaction.vehicle.mileage}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">Price:</span>{' '}
                  {transaction.vehicle.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Purchase Price:
                  </span>{' '}
                  {transaction.vehicle.purchasePrice}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Available:
                  </span>{' '}
                  {transaction.vehicle.available ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
