import React from 'react';
import { useTranslation } from 'react-i18next';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: {
    userId: string;
    textCredits: number;
    videoCredits: number;
    amount: string;
  };
}

const Receipt: React.FC<ReceiptProps> = ({ isOpen, onClose, userDetails }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  // Retrieve the user object from localStorage and parse it
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const fullName = `${user.firstName || t('receipt.name')} ${user.lastName || ''}`.trim();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-xl w-full rounded-lg p-8 shadow-2xl transform scale-105">
        <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-4">
          {t('receipt.successTitle')}
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">
          {t('receipt.premiumUser')}
        </h2>
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{t('receipt.paymentDetails')}</h3>
          <p className="text-lg">
            <strong>{t('receipt.name')}:</strong> {fullName}
          </p>
          <p className="text-lg">
            <strong>{t('receipt.amountPaid')}:</strong> ${userDetails.amount}
          </p>
          <p className="text-lg">
            <strong>{t('receipt.textCredits')}:</strong> {userDetails.textCredits}
          </p>
          <p className="text-lg">
            <strong>{t('receipt.videoCredits')}:</strong> {userDetails.videoCredits}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
        >
          {t('receipt.startJourney')}
        </button>
      </div>
    </div>
  );
};

export default Receipt;