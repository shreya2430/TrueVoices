import { useFormContext } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { FormSwitch } from '../FormSwitch'
import { Space } from '@/types/space'
import { cn } from '@/lib/utils'

type ExtraSettingsFormProps = {
	className?: string
}

export const ExtrasettingsForm = ({ className }: ExtraSettingsFormProps) => {
	const form = useFormContext<Space>()

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				form={form}
				name={'extraSettings.maxVideoDuration'}
				label="Max Video Duration (seconds)"
				type="number"
				placeholder="Enter max video duration"
			/>
			<FormInput
				form={form}
				name={'extraSettings.maxTextCharacters'}
				label="Max Text Characters"
				type="number"
				placeholder="Enter max text characters"
			/>
			<FormInput
				form={form}
				name={'extraSettings.videoButtonText'}
				label="Video Button Text"
				placeholder="Enter video button text"
			/>
			<FormInput
				form={form}
				name={'extraSettings.textButtonText'}
				label="Text Button Text"
				placeholder="Enter text button text"
			/>
			<FormSwitch
				form={form}
				name={'extraSettings.consentDisplay'}
				label="Consent Display"
			/>
			<FormTextarea
				form={form}
				name={'extraSettings.consentStatement'}
				label="Consent Statement"
				placeholder="Enter consent statement"
			/>
			<FormInput
				form={form}
				name={'extraSettings.questionLabel'}
				label="Question Label"
				placeholder="Enter question label"
			/>
			<FormInput
				form={form}
				name={'extraSettings.affiliateLink'}
				label="Affiliate Link"
				placeholder="Enter affiliate link"
			/>
			<FormInput
				form={form}
				name={'extraSettings.thirdPartyReviewLink'}
				label="Third Party Review Link"
				placeholder="Enter third party review link"
			/>
			<FormSwitch
				form={form}
				name={'extraSettings.autoPopulateTestimonials'}
				label="Auto Populate Testimonials"
			/>
			<FormSwitch
				form={form}
				name={'extraSettings.disableVideoForiOS'}
				label="Disable Video for iOS"
			/>
			<FormSwitch
				form={form}
				name={'extraSettings.allowSearchEngines'}
				label="Allow Search Engines"
			/>
		</div>
	)
}
