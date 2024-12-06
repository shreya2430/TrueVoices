import { cn } from '@/lib/utils'
import { FormInput } from '../FormInput'
import { FormSwitch } from '../FormSwitch'
import { FormTextarea } from '../FormTextarea'

type ThankyouFormProps = {
	// Props definition goes here
	className?: string
}

export const ThankyouForm = ({ className }: ThankyouFormProps) => {

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				className="hidden"
				name={'thankYouPage.image'}
				label="Image Upload"
				type="file"
				placeholder=""
				accept="image/gif, image/jpeg, image/png"
			/>
			<FormInput
				name={'thankYouPage.title'}
				label="Title"
				placeholder="Enter title"
			/>
			<FormTextarea
				name={'thankYouPage.message'}
				label="Message"
				placeholder="Enter message"
			/>
			<FormSwitch
				name={'thankYouPage.allowShareOnSocialMedia'}
				label="Allow Share on Social Media"
			/>
		</div>
	)
}
