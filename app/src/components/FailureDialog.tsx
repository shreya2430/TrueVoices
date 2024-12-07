import React from 'react';
import { useTranslation } from 'react-i18next';

interface FailureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

const FailureDialog: React.FC<FailureDialogProps> = ({ isOpen, onClose, errorMessage }) => {
  const { t } = useTranslation(); // Hook to access translations

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-md w-full p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          {t('failureDialog.title')}
        </h1>
        <p className="text-lg mb-6 text-center">
          {errorMessage || t('failureDialog.message')}
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-300"
        >
          {t('failureDialog.retryButton')}
        </button>
      </div>
    </div>
  );
};

export default FailureDialog;