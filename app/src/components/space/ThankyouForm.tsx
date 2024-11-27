import { cn } from '@/lib/utils'
import { FormInput } from '../FormInput'
import { FormSwitch } from '../FormSwitch'
import { FormTextarea } from '../FormTextarea'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type ThankyouFormProps = {
	// Props definition goes here
	className?: string
}

export const ThankyouForm = ({ className }: ThankyouFormProps) => {
	const form = useFormContext()
	useEffect(() => {
		console.log('ThankyouForm', form.getValues())
	}, [])

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<FormInput
				className="file:h-full file:border-solid file:border-input file:px-3 file:pe-3 file:me-3 file:border-0 file:border-e p-0 pe-3"
				name={'thankYouPage.image'}
				label="Image Upload"
				type="file"
				placeholder=""
				accept="image/*"
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
