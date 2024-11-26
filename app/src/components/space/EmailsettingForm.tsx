import { useFormContext } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { Space } from '@/types/space'
import { cn } from '@/lib/utils'

type EmailSettingFormProps = {
	className?: string
}

export const EmailsettingForm = ({ className }: EmailSettingFormProps) => {
	const form = useFormContext<Space>()

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				form={form}
				name={'emailSettings.emailFrom'}
				label="Email From"
				placeholder="Enter sender's email address"
			/>
			<FormInput
				form={form}
				name={'emailSettings.emailTo'}
				label="Email To"
				placeholder="Enter recipient's email address"
			/>
			<FormInput
				form={form}
				name={'emailSettings.subject'}
				label="Subject"
				placeholder="Enter email subject"
			/>
			<FormTextarea
				form={form}
				name={'emailSettings.message'}
				label="Message"
				placeholder="Enter email message"
			/>
		</div>
	)
}
