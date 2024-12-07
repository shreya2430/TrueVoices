import { Space } from "@/types/space";
import thankyYouImage from '../assets/thankYou.gif'

export const defaultSpaceData: Space = {
	spaceName: '',
  spaceLogoUrl: 'https://live.staticflickr.com/65535/53405989488_c12c5b2532.jpg',
	spaceLogo: new File([], 'this is just a placeholder'),
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
		imageUrl: thankyYouImage,
		image: new File([], 'this is just a placeholder'),
		title: 'Thank You!! 😊🥳',
		message: 'Thank you so much for your shoutout! It means a ton for us. ☺️',
		allowShareOnSocialMedia: false,
	},
	extraSettings: {
		videoButtonText: 'Record Video',
		textButtonText: 'Write Text',
		consentDisplay: true,
		consentStatement: 'I agree to the terms and conditions',
		questionLabel: 'Question',
		autoPopulateTestimonials: false,
	},
	emailSettings: {
		emailFrom: 'donot-reply@truevoice.com',
		emailTo: 'notification@truevoice.com',
		subject: 'You got a new testimonial!',
		message: 'You got a new testimonial from {name}!',
	},
}
