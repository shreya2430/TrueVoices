import User from '../models/user-authentication';
import stripePackage from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe Secret Key is not defined in the environment variables.');
}
const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

class PaymentService {
  async createPaymentIntent(amount: number): Promise<string> {
      try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: 'usd',
      });
      return paymentIntent.client_secret;
    } catch (error: any) {
      console.error('Error creating payment intent:', error.message);
      throw new Error('Failed to create payment intent.');
    }
  }

  async updateUserCredits(id: string, textCredits: number, videoCredits: number): Promise<any> {
    if (textCredits < 0 || videoCredits < 0) {
      throw new Error('Credits must be non-negative.');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found.');
    }

    // Increment credits with fallback for undefined fields
    user.textCredits = (user.textCredits || 0) + textCredits;
    user.videoCredits = (user.videoCredits || 0) + videoCredits;
    await user.save();

    return user;
  }
}

export default new PaymentService();