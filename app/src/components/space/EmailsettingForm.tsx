import { cn } from '@/lib/utils'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'

type EmailSettingFormProps = {
	className?: string
}

export const EmailsettingForm = ({ className }: EmailSettingFormProps) => {
	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				name={'emailSettings.emailFrom'}
				label="Email From"
				placeholder="Enter sender's email address"
			/>
			<FormInput
				name={'emailSettings.emailTo'}
				label="Email To"
				placeholder="Enter recipient's email address"
			/>
			<FormInput
				name={'emailSettings.subject'}
				label="Subject"
				placeholder="Enter email subject"
			/>
			<FormTextarea
				name={'emailSettings.message'}
				label="Message"
				placeholder="Enter email message"
			/>
		</div>
	)
}
