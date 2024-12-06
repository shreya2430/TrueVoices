import { Space } from "@/types/space";

export const defaultSpaceData: Space = {
	spaceName: '',
  spaceLogoUrl: 'https://live.staticflickr.com/65535/53405989488_c12c5b2532.jpg',
	spaceLogo: new File([], 'defaultSpaceLogo'),
	headerTitle: 'Testimonials',
	customMessage: 'We would love to hear your thoughts, suggestions, and feedback!',
	inputs: {
		name_enabled: true,
		email_enabled: true,
		name_required: true,
		email_required: true,
	},
	themes: 'light',
	starRating: true,
	text: true,
	video: true,
	listQuestion: [
		{
			question: 'How was your experience?',
		},
		{
			question: 'What did you like the most?',
		},
		{
			question: 'What can we improve?',
		},
	],
	thankYouPage: {
		imageUrl: 'https://tenor.com/bbqsN.gif',
		image: new File([], 'defaultThankYouImage'),
		title: 'Thank You',
		message: 'Thank you for your feedback!',
		allowShareOnSocialMedia: false,
	},
	extraSettings: {
		maxVideoDuration: 60,
		maxTextCharacters: 500,
		videoButtonText: 'Record Video',
		textButtonText: 'Write Text',
		consentDisplay: true,
		consentStatement: 'I agree to the terms and conditions',
		questionLabel: 'Question',
		affiliateLink: '',
		thirdPartyReviewLink: '',
		autoPopulateTestimonials: false,
		disableVideoForiOS: false,
		allowSearchEngines: false,
	},
	emailSettings: {
		emailFrom: 'donot-reply@truevoice.com',
		emailTo: 'notification@truevoice.com',
		subject: 'You got a new testimonial!',
		message: 'You got a new testimonial from {name}!',
	},
}
