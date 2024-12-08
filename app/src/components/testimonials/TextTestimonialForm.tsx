import { useUploadFileMutation } from '@/store/file-upload-api'
import { useCreateTestimonialMutation } from '@/store/testimonial-api'
import { Testimonial, TestimonialReqSchema } from '@/types/testimonial'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CollectionForm } from '../CollectionForm'
import { Thankyou } from '../Thankyou'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

type TextTestimonialFormProps = {
	children: React.ReactNode
}

export const TextTestimonialForm = ({ children }: TextTestimonialFormProps) => {
	const [createTestimonial, { isLoading, isSuccess }] =
		useCreateTestimonialMutation()
	const [uploadFile] = useUploadFileMutation()
	const { spaceName } = useParams()
	const [open, setOpen] = React.useState(false)

	const onSubmit = async (data: Testimonial) => {
		console.log(data)
		if (data.profilePicFile) {
			const formData = new FormData()
			formData.append('file', data.profilePicFile)
			const profilePic = await uploadFile({
				data: formData,
				type: 'image',
				spaceName: data.spaceName,
			})
			data.profilePic = profilePic.data?.url
		}
		const testimonailReqData = await TestimonialReqSchema.parseAsync({
			...data,
			rating: parseInt(data.rating),
		})
		await createTestimonial({ body: testimonailReqData, spaceName })
	}

	useEffect(() => {
		if (isSuccess) {
			setOpen(false)
		}
	}, [isSuccess])

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogOverlay />
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Text Testimonial Form</DialogTitle>
					</DialogHeader>
					<DialogDescription className="sr-only">
						Fill out the form to submit a text testimonial
					</DialogDescription>
					<CollectionForm
						type="text"
						isLoading={isLoading}
						onSubmit={onSubmit}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={isSuccess}>
				<DialogOverlay />
				<DialogContent>
					<DialogTitle className="sr-only">Thank you page</DialogTitle>
					<DialogDescription className="sr-only">
						Thank you page after submitting the testimonial
					</DialogDescription>
					<Thankyou className='border-none shadow-none p-3'/>
				</DialogContent>
			</Dialog>
		</>
	)
}
