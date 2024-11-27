import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { Form } from '../ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { EmailsettingForm } from './EmailsettingForm'
import { ExtrasettingsForm } from './ExtrasettingsForm'
import { GeneralForm } from './GeneralForm'
import { ThankyouForm } from './ThankyouForm'
import { Space, SpaceResSchema, SpaceSchema } from '@/types/space'
import { createSpace } from '@/services/space-service'
import { useState } from 'react'

export const SpaceForm = () => {
	const form = useForm<Space>({
		resolver: zodResolver(SpaceSchema),
		defaultValues: {
			spaceName: '',
			spaceLogo: '',
			headerTitle: '',
			customMessage: '',
			inputs: {
				name_enabled: true,
				email_enabled: true,
				name_required: true,
				email_required: true,
			},
			themes: 'Light',
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
				imageUrl: '',
				image: new File([], ''),
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
		},
		shouldUnregister: false,
	})

	const [open, setOpen] = useState(false)

	const { mutate: addSpace } = useMutation({
		mutationFn: createSpace,
		onSuccess: () => {
			console.log('Space created successfully')
			form.reset()
			setOpen(false)
		},
		onError: (error) => {
			console.log(SpaceResSchema.shape);
			console.log(error)
		},
	})

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogOverlay className="backdrop-blur-sm bg-black/70" />
			<DialogTrigger asChild>
				<Button variant={'outline'}>Create Space</Button>
			</DialogTrigger>
			<DialogContent className="min-w-max my-8">
				<DialogHeader>
					<DialogTitle>Create Space</DialogTitle>
				</DialogHeader>
				<Tabs
					defaultValue="general"
					className=""
				>
					<Form {...form}>
						<form
							className="flex flex-col justify-between min-h-max min-w-max"
							onSubmit={form.handleSubmit((data) => addSpace(data))}
						>
							<div className="space-y-4">
								<TabsList className="w-full">
									<TabsTrigger
										className="w-full"
										value="general"
									>
										General
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="thankyou"
									>
										Thank You
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="extrasetting"
									>
										Extra Setting
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="emailsetting"
									>
										Email Setting
									</TabsTrigger>
								</TabsList>
								<TabsContent value="general">
									<GeneralForm />
								</TabsContent>
								<TabsContent value="thankyou">
									<ThankyouForm />
								</TabsContent>
								<TabsContent value="extrasetting">
									<ExtrasettingsForm />
								</TabsContent>
								<TabsContent value="emailsetting">
									<EmailsettingForm />
								</TabsContent>
							</div>
							<DialogFooter className="mt-6">
								<Button
									variant={'default'}
									className="w-full"
									type="submit"
								>
									Create Space
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}
