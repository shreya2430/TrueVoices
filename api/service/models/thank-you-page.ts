import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IThankYouPage extends Document {
  imageUrl: string;
  title: string;
  message: string;
  allowShareOnSocialMedia: boolean;
}

const ThankYouPageSchema: Schema<IThankYouPage> = new Schema({
  imageUrl: { type: String, default: '' },
  title: { type: String, default: 'Thank You for Your Testimonial!' },
  message: { 
    type: String, 
    default: 'Thank you for your time for giving valuable feedback' 
  },
  allowShareOnSocialMedia: { type: Boolean, default: false }
});

const ThankYouPage: Model<IThankYouPage> = mongoose.model<IThankYouPage>(
  'ThankYouPage',
  ThankYouPageSchema
);

export default ThankYouPage;