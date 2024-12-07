import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Space } from '@/types/space'
import { useEffect, useState } from 'react'
import { defaultSpaceData } from '@/lib/space-default'
import {useGetSpaceQuery} from "@/store/space-store";
import {useParams} from "react-router-dom";
import { PencilLineIcon, VideoIcon } from 'lucide-react'
import { VideoTestimonialForm } from './testimonials/VideoTestimonialForm'
import { TextTestimonialForm } from './testimonials/TextTestimonialForm'
import { Avatar as ShadcnAvatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import Avatar from 'boring-avatars'


type TestimonialPageProps = {
	// Props definition goes here
	className?: string
	space?: Space

	preview?: boolean
}

export const TestimonialPage = ({
	className,
	space,
	preview = false,
}: TestimonialPageProps) => {
	const [testimonialSpace, setTestimonialSpace] = useState<Space>(defaultSpaceData)
	const { spaceName } = useParams();
	const { data: spaceData, isSuccess } = useGetSpaceQuery(spaceName || '', { skip: !spaceName });

	useEffect(() => {
		if (space) {
			setTestimonialSpace(
				space
			)
		}
	}, [space])
	return (
		<>
			{preview && (		
				<div
					className={cn(
						'flex flex-col space-y-8 text-base max-w-xl mx-auto p-10 bg-background text-foreground',
						`${testimonialSpace.themes}`,
						className,
					)}
				>
					<div className="flex flex-col items-center text-center space-y-6">
						<ShadcnAvatar className='size-20 rounded-lg'>
							<AvatarImage src={testimonialSpace.spaceLogoUrl} />
							<AvatarFallback>
								<Avatar name={testimonialSpace.spaceName} className='size-20 rounded-lg' square variant="marble" />
							</AvatarFallback>
						</ShadcnAvatar>
						<h1 className="text-4xl font-bold">{testimonialSpace.headerTitle}</h1>
						<p className="text-xl">{testimonialSpace.customMessage}</p>
					</div>
					<ul className="flex flex-col space-y-1 max-w-xl">
						<h3 className="text-2xl font-bold">{testimonialSpace.extraSettings.questionLabel}</h3>
						<div className="h-1 rounded bg-neutral-950 w-20" />
						{testimonialSpace.listQuestion.map((item) => (
							<li key={item.question}>{item.question}</li>
						))}
					</ul>
					<div className="flex space-x-2">
						{testimonialSpace.video && (
							<Button
								variant={'default'}
								className={'w-full space-x-2'}
							>
								<VideoIcon className='size-12'/>
								{testimonialSpace.extraSettings.videoButtonText}
							</Button>
						)}
						{testimonialSpace.text && (
							<Button
								variant={'default'}
								className={'w-full space-x-2'}
							>
								<PencilLineIcon className='size-12'/>
								{testimonialSpace.extraSettings.textButtonText}
							</Button>
						)}
					</div>
				</div>
			)}
			{!preview && isSuccess && (
				<div
					className={cn(
						'flex flex-col space-y-8 text-base max-w-xl mx-auto p-10 bg-background text-foreground',
						`${spaceData.themes}`,
						className,
					)}
				>
					<div className="flex flex-col items-center text-center space-y-6">
						<ShadcnAvatar className='size-20 rounded-lg'>
							<AvatarImage src={''} />
							<AvatarFallback>
								<Avatar name={spaceData.spaceName} className='size-20 rounded-lg' square variant="marble" />
							</AvatarFallback>
						</ShadcnAvatar>
						<h1 className="text-4xl font-bold">{spaceData.headerTitle}</h1>
						<p className="text-xl">{spaceData.customMessage}</p>
					</div>
					<ul className="flex flex-col space-y-1 max-w-xl">
						<h3 className="text-2xl font-bold">{spaceData.extraSettings.questionLabel}</h3>
						<div className="h-1 rounded bg-neutral-950 w-20" />
						{spaceData.listQuestion.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<div className="flex space-x-2">
						{spaceData.video && (
							<VideoTestimonialForm>
								<Button
									variant={'default'}
									className={'w-full space-x-2'}
								>
									<VideoIcon className='size-12'/>
									{spaceData.extraSettings.videoButtonText}
								</Button>
							</VideoTestimonialForm>
						)}
						{spaceData.text && (
							<TextTestimonialForm>
								<Button
									variant={'default'}
									className={'w-full space-x-2'}
								>
									<PencilLineIcon className='size-12'/>
									{spaceData.extraSettings.textButtonText}
								</Button>
							</TextTestimonialForm>
						)}
					</div>
				</div>
			)}
		</>
	)
}
