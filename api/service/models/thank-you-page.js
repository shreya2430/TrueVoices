import mongoose from "mongoose";

export const ThankYouPageSchema = new mongoose.Schema({
    spaceId: { type: String, required: true, unique: true },
    imageUrl: { type: String, default: '' },
    title: { type: String, default: 'Thank You for Your Testimonial!' },
    message: { type: String, default: 'Thank you for your time for giving valuable feedback' },
    allowShareOnSocialMedia: { type: Boolean, default: false }
});

const ThankYouPage = mongoose.model('ThankYouPage', ThankYouPageSchema);

export default ThankYouPage;