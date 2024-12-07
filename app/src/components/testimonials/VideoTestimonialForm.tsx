import { useUploadFileMutation } from '@/store/file-upload-api'
import { useCreateTestimonialMutation } from '@/store/testimonial-api'
import { Testimonial, TestimonialReqSchema } from '@/types/testimonial'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CollectionForm } from '../CollectionForm'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { VideoRecorder } from '../VideoRecorder'
import { Button } from '../ui/button'
import { Thankyou } from '../Thankyou'

type VideoTestimonialFormProps = {
	children: React.ReactNode
}

export const VideoTestimonialForm = ({
	children,
}: VideoTestimonialFormProps) => {
	const [createTestimonial, { isLoading, isSuccess }] =
		useCreateTestimonialMutation()
	const [uploadFile] = useUploadFileMutation()
	const { spaceName } = useParams()
	const [open, setOpen] = React.useState(false)
	const [step, setStep] = useState<'record' | 'form'>('record')
	const [videoObj, setVideoObj] = useState<{
		videoFile: File
		videoUrl: string
	} | null>(null)

	const onSubmit = async (data: Testimonial) => {
		console.log(data)
		const formData = new FormData()
		if (data.profilePicFile) {
			formData.append('file', data.profilePicFile)
			const profilePic = await uploadFile({
				data: formData,
				type: 'image',
				spaceName: data.spaceName,
			})
			data.profilePic = profilePic.data?.url
		}
		formData.delete('file')
		formData.append('file', videoObj?.videoFile as File)
		const video = await uploadFile({
			data: formData,
			type: 'video',
			spaceName: data.spaceName,
		})
		data.content = video.data?.url
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
		console.log(videoObj)
	}, [isSuccess, videoObj])

	const handleOnRecordingComplete = (videoBlob: Blob, videoUrl: string) => {
		setVideoObj({
			videoFile: new File(
				[videoBlob],
				`video-testimonial-${spaceName}-${new Date().toISOString()}.mp4`,
			),
			videoUrl,
		})
		setStep('form')
	}

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
						<DialogTitle>Video Testimonial Form</DialogTitle>
					</DialogHeader>
					<DialogDescription className="sr-only">
						Fill out the form to submit a video testimonial
					</DialogDescription>
					{step === 'record' && (
						<VideoRecorder onRecordingComplete={handleOnRecordingComplete} />
					)}
					{step === 'form' && (
						<>
							<Button onClick={() => setStep('record')}>Back</Button>
							<CollectionForm
								type="video"
								isLoading={isLoading}
								onSubmit={onSubmit}
								videoFile={videoObj?.videoFile}
								videoUrl={videoObj?.videoUrl}
							/>
						</>
					)}
				</DialogContent>
			</Dialog>
			<Dialog open={isSuccess}>
				<DialogOverlay />
				<DialogContent>
					<DialogTitle className="sr-only">Thank you page</DialogTitle>
					<DialogDescription className="sr-only">
						Thank you page after submitting the testimonial
					</DialogDescription>
					<Thankyou className='border-none shadow-none'/>
				</DialogContent>
			</Dialog>
		</>
	)
}
