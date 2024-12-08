import mongoose from "mongoose";

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
}, { _id: false });

const spaceSchema = new mongoose.Schema(
	{
		spaceName: {
			type: String,
			required: true,
			unique: true,
		},
		spaceLogo: { type: String, required: true },
		headerTitle: { type: String, required: true, default: 'Testimonial' },
		customMessage: {
			type: String,
			required: true,
			default: 'Please leave your testimonial',
		},
		listQuestion: [String],
		starRating: Boolean,
		text: Boolean,
		video: Boolean,
		themes: {
			type: String,
			enum: ['light', 'dark'],
		},
		thankYouPage: { type: mongoose.Schema.Types.ObjectId, ref: 'ThankYouPage' },
		inputs: { type: InputsSchema },
		extraSettings: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ExtraSettings',
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
)

export type Space = mongoose.InferSchemaType<typeof spaceSchema>;

const SpaceModel = mongoose.model('Space', spaceSchema);


export default SpaceModel;