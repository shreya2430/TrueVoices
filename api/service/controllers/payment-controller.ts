import { Request, Response } from 'express';
import PaymentService from '../services/payment-service';

class PaymentController {
  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { amount } = req.body;
      if (!amount) {
        res.status(400).json({ error: 'Amount is required.' });
        return;
      }

      const clientSecret = await PaymentService.createPaymentIntent(amount);
        res.status(200).json({ clientSecret });
    } catch (error: any) {
      console.error('Error creating payment intent:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async updateCredits(req: Request, res: Response): Promise<void> {
    try {
      const { userId, textCredits, videoCredits } = req.body;
      if (!userId || textCredits === undefined || videoCredits === undefined) {
        res.status(400).json({ error: 'User ID, textCredits, and videoCredits are required.' });
        return;
      }

      const updatedUser = await PaymentService.updateUserCredits(userId, textCredits, videoCredits);
      res.status(200).json({
        message: 'Credits updated successfully!',
        user: updatedUser,
      });
    } catch (error: any) {
      console.error('Error updating credits:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PaymentController();