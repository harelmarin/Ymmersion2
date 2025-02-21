import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { fetchTransactionDetails } from '../services/transactionService';
import React from 'react';
import { Transaction } from '../types/transactionData';
import { FileText } from 'lucide-react';
import { generateInvoice } from '../utils/exportInvoiceToPdf';
const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: transaction,
    isLoading,
    error,
  } = fetchTransactionDetails(id || '');

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
          <div className="w-[75%] mx-auto max-w-7xl">
            <div className="text-center">Chargement...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
          <div className="w-[75%] mx-auto max-w-7xl">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Une erreur est survenue
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!transaction) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
          <div className="w-[75%] mx-auto max-w-7xl">
            <div className="text-center">Transaction non trouvée</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Détails de la transaction
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Transaction #{transaction.id}
                </h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Date de transaction</p>
                  <p className="font-medium">
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
                </div>
                <div>
                  <p className="text-gray-600">Montant</p>
                  <p
                    className={`font-bold text-xl ${
                      transaction.transactionType === 'purchase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.amount.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>

              {transaction.employee && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Informations employé
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Nom</p>
                      <p className="font-medium">{transaction.employee.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">
                        {transaction.employee.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rôle</p>
                      <p className="font-medium">{transaction.employee.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {transaction.vehicle && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Informations véhicule
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Marque</p>
                      <p className="font-medium">{transaction.vehicle.brand}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Modèle</p>
                      <p className="font-medium">{transaction.vehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Année</p>
                      <p className="font-medium">{transaction.vehicle.year}</p>
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
                        {transaction.vehicle.mileage.toLocaleString('fr-FR')} km
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Prix</p>
                      <p className="font-medium">
                        {transaction.vehicle.price.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => generateInvoice(transaction)}
                className="mt-4 bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition gap-4 flex hover:cursor-pointer"
              >
                <FileText />
                Générer la facture PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
