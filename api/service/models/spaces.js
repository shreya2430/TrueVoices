import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema({
  spaceName: { type: String, required: true, unqiue: true },
  spaceLogo: { type: String, required: true },
  headerTitle: { type: String, required: true, default: 'Testimonial' },
  customMessage: { type: String, required: true, default: 'Please leave your testimonial' },
  listQuestion: [String],
  starRating: Boolean,
  spaceType: {
    type: String,
    enum: ['Text', 'Video', 'TextAndVideo']
  },
  themes: {
    type: String,
    enum: ['Light', 'Dark']
  },
  thankYouPage: { type: mongoose.Schema.Types.ObjectId, ref: 'ThankYouPage' },
  inputs: { type: InputsSchema },
  extraSettings: { type: mongoose.Schema.Types.ObjectId, ref: 'ExtraSettings' },
})

const InputsSchema = new mongoose.Schema({
  name_required: Boolean,
  name_enabled: Boolean,
  email_required: Boolean,
  email_enabled: Boolean,
  companyAndTitle_required: Boolean,
  companyAndTitle_enabled: Boolean,
  socialLinks_required: Boolean,
  socialLinks_enabled: Boolean,
  address_required: Boolean,
  address_enabled: Boolean
});

const Space = mongoose.model('Space', spaceSchema);

export default Space;