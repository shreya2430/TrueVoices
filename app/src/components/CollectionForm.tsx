import { useGetSpaceQuery } from '@/store/space-store'
import { Testimonial, TestimonialFormSchema } from '@/types/testimonial'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FormCheckbox } from './FormCheckbox'
import { FormInput } from './FormInput'
import { FormRating } from './FormRating'
import { FormTextarea } from './FormTextarea'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { Loader } from './ui/loader'
import { VideoPreview } from './ui/videopreview'

type CollectionFormProps = {
	onSubmit: (data: Testimonial) => void
	type: 'text' | 'video'
	videoUrl?: string
	videoFile?: File
	isLoading: boolean
}

export const CollectionForm = ({
	onSubmit,
	type,
	videoUrl,
	videoFile,
	isLoading,
}: CollectionFormProps) => {
	const { spaceName } = useParams()
	const { data: spaceData, isSuccess } = useGetSpaceQuery(spaceName || '', {
		skip: !spaceName,
	})
	const form = useForm<Testimonial>({
		resolver: zodResolver(TestimonialFormSchema),
		defaultValues: {
			name: '',
			address: '',
			companyAndTitle: '',
			socialLinks: '',
			videoFile,
			spaceName,
			liked: false,
			rating: '',
			consent: true,
			testimonialType: type,
		},
		shouldUnregister: false,
		mode: 'onBlur',
		shouldFocusError: true,
	})

	return (
		<>
			{isSuccess && (
				<Form {...form}>
					<form
						className="space-y-3"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{type === 'text' && (
							<ul className="flex flex-col space-y-1 max-w-xl">
								<h3 className="text-2xl font-bold">
									{spaceData.extraSettings.questionLabel}
								</h3>
								<div className="h-1 rounded bg-neutral-950 w-20" />
								{spaceData.listQuestion.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						)}
						<FormRating
							name="rating"
							label="Rating"
							required
						/>
						{type === 'video' && (
							<VideoPreview videoUrl={videoUrl ? videoUrl : ''} />
						)}
						{type === 'text' && (
							<FormTextarea
								name="content"
								label="Message"
								placeholder="Enter your feedback message"
								required
							/>
						)}
						{spaceData.inputs.name_enabled && (
							<FormInput
								name="name"
								label="Name"
								placeholder="Enter your name"
								required={spaceData.inputs.name_required}
							/>
						)}
						{spaceData.inputs.email_enabled && (
							<FormInput
								name="email"
								label="Email"
								placeholder="Enter your email"
								required={spaceData.inputs.email_required}
							/>
						)}
						{spaceData.inputs.address_enabled && (
							<FormInput
								name="address"
								label="Address"
								placeholder="Enter your address"
								required={spaceData.inputs.address_required}
							/>
						)}
						{spaceData.inputs.companyAndTitle_enabled && (
							<FormInput
								name="companyAndTitle"
								label="Company and Title"
								placeholder="Enter your company and title"
								required={spaceData.inputs.companyAndTitle_required}
							/>
						)}
						{spaceData.inputs.socialLinks_enabled && (
							<FormInput
								name="socialLinks"
								label="Social Links"
								placeholder="Enter your social links"
								required={spaceData.inputs.socialLinks_required}
							/>
						)}
						{spaceData.extraSettings.consentDisplay && (
							<FormCheckbox
								name="consent"
								label={spaceData.extraSettings.consentStatement}
								required
							/>
						)}
						<FormInput
							name="profilePicFile"
							className="hidden"
							label="Profile Picture"
							type="file"
							accept="image/*"
							placeholder="Upload profile picture"
						/>
						<Button
							type="submit"
							className="w-full space-x-2"
							onClick={form.handleSubmit(onSubmit)}
							disabled={isLoading}
						>
							{isLoading && <Loader />}
							Submit
						</Button>
					</form>
				</Form>
			)}
		</>
	)
}
