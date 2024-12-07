import express from 'express';
import PaymentController from '../controllers/payment-controller';

const router = express.Router();

router.post('/create-payment-intent', PaymentController.createPaymentIntent);
router.post('/update-credits', PaymentController.updateCredits);

export default router;