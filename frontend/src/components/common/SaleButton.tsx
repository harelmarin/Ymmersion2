import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SaleButtonProps {
  vehicleId: string;
}

const SaleButton: React.FC<SaleButtonProps> = ({ vehicleId }) => {
  const navigate = useNavigate();

  const handleSaleClick = () => {
    navigate(`/transaction/new/${vehicleId}`);
  };

  return (
    <button
      onClick={handleSaleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Procéder à la vente
    </button>
  );
};

export default SaleButton; 