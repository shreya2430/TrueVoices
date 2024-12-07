import mongoose, { Document, Schema, Model } from 'mongoose';

const ExtraSettingsSchema = new Schema({
  videoButtonText: { type: String, default: 'Record Video' },
  textButtonText: { type: String, default: 'Send Text' },
  consentDisplay: { type: Boolean, default: 'Required' },
  consentStatement: {
    type: String,
    default: 'I give this company permission to use my testimonial.',
  },
  questionLabel: {
    type: String,
    default: 'What did you like about our service?',
  },
  autoPopulateTestimonials: { type: Boolean, default: false },
  spaceName: { type: String, required: true },
});

const ExtraSettings = mongoose.model(
  'ExtraSettings',
  ExtraSettingsSchema
);

export type ExtraSettingsType = mongoose.InferSchemaType<typeof ExtraSettingsSchema> & Document;

export default ExtraSettings;