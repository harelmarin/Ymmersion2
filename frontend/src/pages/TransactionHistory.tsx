import { useParams, useNavigate} from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { fetchTransactionDetails } from '../services/transactionService';
import React from 'react';
import { generateInvoice } from '../utils/exportInvoiceToPdf';
import { FileText } from 'lucide-react';

const TransactionHistory = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: transaction,
    isLoading,
    error,
  } = fetchTransactionDetails(id || '');

  const navigate = useNavigate();

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!transaction) return <p>Transaction non trouvée</p>;

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100 mt-10">
        <div className="w-[75%] mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Historique des transactions
          </h1>

          <div
                key={transaction.id}
                onClick={() =>
                  navigate(`/transaction/${transaction.id}/details`)
                }
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
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
                  {transaction.transactionType === 'purchase' ? 'Achat' : 'Vente'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Date de transaction</p>
                  <p className="font-medium">
                    {new Date(transaction.transactionDate).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Montant</p>
                  <p
                    className={`font-bold text-xl ${
                      transaction.transactionType === 'purchase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.amount.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>

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

export default TransactionHistory;
