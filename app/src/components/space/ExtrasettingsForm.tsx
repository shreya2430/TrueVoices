import { cn } from '@/lib/utils'
import { FormInput } from '../FormInput'
import { FormSwitch } from '../FormSwitch'
import { FormTextarea } from '../FormTextarea'

type ExtraSettingsFormProps = {
	className?: string
}

export const ExtrasettingsForm = ({ className }: ExtraSettingsFormProps) => {

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				name={'extraSettings.maxVideoDuration'}
				label="Max Video Duration (seconds)"
				type="number"
				placeholder="Enter max video duration"
			/>
			<FormInput
				name={'extraSettings.maxTextCharacters'}
				label="Max Text Characters"
				type="number"
				placeholder="Enter max text characters"
			/>
			<FormInput
				name={'extraSettings.videoButtonText'}
				label="Video Button Text"
				placeholder="Enter video button text"
			/>
			<FormInput
				name={'extraSettings.textButtonText'}
				label="Text Button Text"
				placeholder="Enter text button text"
			/>
			<FormSwitch
				name={'extraSettings.consentDisplay'}
				label="Consent Display"
			/>
			<FormTextarea
				name={'extraSettings.consentStatement'}
				label="Consent Statement"
				placeholder="Enter consent statement"
			/>
			<FormInput
				name={'extraSettings.questionLabel'}
				label="Question Label"
				placeholder="Enter question label"
			/>
			<FormInput
				name={'extraSettings.affiliateLink'}
				label="Affiliate Link"
				placeholder="Enter affiliate link"
			/>
			<FormInput
				name={'extraSettings.thirdPartyReviewLink'}
				label="Third Party Review Link"
				placeholder="Enter third party review link"
			/>
			<FormSwitch
				name={'extraSettings.autoPopulateTestimonials'}
				label="Auto Populate Testimonials"
			/>
			<FormSwitch
				name={'extraSettings.disableVideoForiOS'}
				label="Disable Video for iOS"
			/>
			<FormSwitch
				name={'extraSettings.allowSearchEngines'}
				label="Allow Search Engines"
			/>
		</div>
	)
}
