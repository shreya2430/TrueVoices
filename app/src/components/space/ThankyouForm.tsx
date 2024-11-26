import { Space } from '@/types/space'
import { useFormContext } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { FormSwitch } from '../FormSwitch'
import { cn } from '@/lib/utils'

type ThankyouFormProps = {
	// Props definition goes here
	className?: string
}

export const ThankyouForm = ({ className }: ThankyouFormProps) => {
	const form = useFormContext<Space>()

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				className="file:h-full file:border-solid file:border-input file:px-3 file:pe-3 file:me-3 file:border-0 file:border-e p-0 pe-3"
				form={form}
				name={'thankYouPage.image'}
				label="Image Upload"
				type="file"
				placeholder=""
				accept="image/*"
			/>
			<FormInput
				form={form}
				name={'thankYouPage.title'}
				label="Title"
				placeholder="Enter title"
			/>
			<FormTextarea
				form={form}
				name={'thankYouPage.message'}
				label="Message"
				placeholder="Enter message"
			/>
			<FormSwitch
				form={form}
				name={'thankYouPage.allowShareOnSocialMedia'}
				label="Allow Share on Social Media"
			/>
		</div>
	)
}
