import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IExtraSettings extends Document {
  maxVideoDuration: number;
  maxTextCharacters: number;
  videoButtonText: string;
  textButtonText: string;
  consentDisplay: string;
  consentStatement: string;
  questionLabel: string;
  affiliateLink: string;
  thirdPartyReviewLink: string;
  autoPopulateTestimonials: boolean;
  disableVideoForiOS: boolean;
  allowSearchEngines: boolean;
}

const ExtraSettingsSchema: Schema<IExtraSettings> = new Schema({
  maxVideoDuration: { type: Number, default: 60 },
  maxTextCharacters: { type: Number, default: 500 },
  videoButtonText: { type: String, default: 'Record Video' },
  textButtonText: { type: String, default: 'Send Text' },
  consentDisplay: { type: String, default: 'Required' },
  consentStatement: {
    type: String,
    default: 'I give this company permission to use my testimonial.',
  },
  questionLabel: {
    type: String,
    default: 'What did you like about our service?',
  },
  affiliateLink: { type: String, default: '' },
  thirdPartyReviewLink: { type: String, default: '' },
  autoPopulateTestimonials: { type: Boolean, default: false },
  disableVideoForiOS: { type: Boolean, default: false },
  allowSearchEngines: { type: Boolean, default: true },
});

const ExtraSettings: Model<IExtraSettings> = mongoose.model<IExtraSettings>(
  'ExtraSettings',
  ExtraSettingsSchema
);

export type ExtraSettingsType = mongoose.InferSchemaType<typeof ExtraSettingsSchema>

export default ExtraSettings;