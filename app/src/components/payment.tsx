/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent, resetPaymentState } from '../store/payment-slice';
import { RootState } from '../store/store';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import Receipt from './receipt';
import FailureDialog from './FailureDialog'; // Import FailureDialog component
import Footer from './LandingPage/Footer';
import Header from './LandingPage/Header';
import { useTranslation } from 'react-i18next';


//const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripePublicKey) {
  throw new Error('VITE_STRIPE_PUBLIC_KEY is not defined in the environment variables');
}
const stripePromise = loadStripe(stripePublicKey);

const PaymentForm: React.FC = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { clientSecret, error, intentLoading, updateLoading } = useSelector((state: RootState) => state.payment);

  const [showReceipt, setShowReceipt] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false); // Failure dialog state
  const [failureMessage, setFailureMessage] = useState(''); // Store failure reason
  const [userDetails, setUserDetails] = useState({
    userId: '',
    textCredits: 0,
    videoCredits: 0,
    amount: '',
  });

  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');
  const userId = queryParams.get('userId');
  const textCredits = parseInt(queryParams.get('textCredits') || '0', 10);
  const videoCredits = parseInt(queryParams.get('videoCredits') || '0', 10);

  useEffect(() => {
    dispatch(createPaymentIntent(Number(amount)));
    return () => {
      dispatch(resetPaymentState());
    };
  }, [amount, dispatch]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setFailureMessage('Card details are required.');
      setShowFailureDialog(true);
      return;
    }

    const clientSecretString =
      typeof clientSecret === 'string'
        ? clientSecret
        : (clientSecret as unknown as { clientSecret: string }).clientSecret;

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecretString, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setFailureMessage(error.message || 'Payment failed. Please try again.');
        setShowFailureDialog(true); // Show failure dialog
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        await axios.post('http://localhost:3000/v1/payments/update-credits', {
          userId,
          textCredits,
          videoCredits,
        });

        setUserDetails({
          userId: userId || '',
          textCredits,
          videoCredits,
          amount: amount || '0',
        });

        setShowReceipt(true); // Show the receipt dialog
      }
    } catch (err: any) {
      setFailureMessage(err.message || 'An unexpected error occurred.');
      setShowFailureDialog(true); // Show failure dialog
    }
  };

  const handleFailureDialogClose = () => {
    setShowFailureDialog(false); // Close failure dialog
  };

  const handleReceiptClose = () => {
		setShowReceipt(false)
		navigate('/dashboard') // Redirect to the desired route
	};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6">
      <form
        onSubmit={handlePayment}
        className="max-w-3xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-10 shadow-2xl rounded-lg transform hover:scale-105 transition-all duration-300"
      >
        <h1 className="text-3xl font-extrabold text-center mb-8">{t('payment.title')}</h1>
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('payment.orderDetails')}</h2>
          <p className="text-lg">
            <strong>{t('payment.plan')}:</strong> Premium Subscription
          </p>
          <p className="text-lg">
            <strong>{t('payment.textCredits')}:</strong> {textCredits}
          </p>
          <p className="text-lg">
            <strong>{t('payment.videoCredits')}:</strong> {videoCredits}
          </p>
          <p className="text-lg">
            <strong>{t('payment.amount')}:</strong> ${amount}
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="card-element" className="block text-sm font-medium mb-2">
            {t('payment.enterCardDetails')}
          </label>
          <CardElement
            id="card-element"
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={!stripe || intentLoading || updateLoading}
          className="w-full py-4 px-6 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {intentLoading || updateLoading ? t('payment.processing') : t('payment.payNow')}
        </button>
      </form>
      <Receipt isOpen={showReceipt} onClose={handleReceiptClose} userDetails={userDetails} />
      <FailureDialog isOpen={showFailureDialog} onClose={handleFailureDialogClose} errorMessage={failureMessage} />
    </div>
  );
};

const PaymentPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <Header/>
      <PaymentForm />
      <Footer/>
    </Elements>
  );
};

export default PaymentPage;