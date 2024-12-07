import mongoose, { Document, Schema, Model } from 'mongoose';

const ThankYouPageSchema = new Schema({
  imageUrl: { type: String, default: '' },
  title: { type: String, default: 'Thank You for Your Testimonial!' },
  message: { 
    type: String, 
    default: 'Thank you for your time for giving valuable feedback' 
  },
  allowShareOnSocialMedia: { type: Boolean, default: false },
  spaceName: { type: String, required: true },
});

const ThankYouPage = mongoose.model(
  'ThankYouPage',
  ThankYouPageSchema
);

export type ThankYouPageType = mongoose.InferSchemaType<typeof ThankYouPageSchema> & Document;

export default ThankYouPage;