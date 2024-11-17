import mongoose from "mongoose";

const ExtraSettingsSchema = new mongoose.Schema({
    spaceId: { type: String, required: true, unique: true },
    maxVideoDuration: { type: Number, default: 60 },
    maxTextCharacters: { type: Number, default: 500 },
    videoButtonText: { type: String, default: 'Record Video' },
    textButtonText: { type: String, default: 'Send Text' },
    consentDisplay: { type: String, default: 'Required' },
    consentStatement: { type: String, default: 'I give this company permission to use my testimonial.' },
    questionLabel: { type: String, default: 'What did you like about our service?' },
    affiliateLink: { type: String, default: '' },
    thirdPartyReviewLink: { type: String, default: '' },
    autoPopulateTestimonials: { type: Boolean, default: false },
    disableVideoForiOS: { type: Boolean, default: false },
    allowSearchEngines: { type: Boolean, default: true },
});

const ExtraSettings = mongoose.model('ExtraSettings', ExtraSettingsSchema);
export default ExtraSettings;