import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Space } from '@/types/space'
import { useEffect, useState } from 'react'
import { defaultSpaceData } from '@/lib/space-default'
import {useGetSpaceQuery} from "@/store/space-store";
import {useParams} from "react-router-dom";

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
	const { data } = useGetSpaceQuery(spaceName || '', { skip: !spaceName });

	useEffect(() => {
		if (space) {
			setTestimonialSpace(
				space
			)
		}
	}, [space])
	return (
		<div
			className={cn(
				'flex flex-col space-y-8 text-base max-w-xl mx-auto p-10 bg-background text-foreground',
				`${preview ? testimonialSpace.themes : data?.themes}`,
				className,
			)}
		>
			<div className="flex flex-col text-center space-y-6">
				<img
					className="aspect-square rounded-xl h-20 w-20 self-center object-cover"
					src={preview ? testimonialSpace.spaceLogoUrl : data?.spaceLogo}
				/>
				<h1 className="text-4xl font-bold">{preview ? testimonialSpace.headerTitle : data?.headerTitle}</h1>
				<p className="text-xl">{preview ? testimonialSpace.customMessage : data?.customMessage}</p>
			</div>
			<ul className="flex flex-col space-y-1 max-w-xl">
				<h3 className="text-2xl font-bold">{preview ? testimonialSpace.extraSettings.questionLabel : data?.extraSettings.questionLabel}</h3>
				<div className="h-1 rounded bg-neutral-950 w-20" />
				{preview ? testimonialSpace.listQuestion.map((item) => (
					<li key={item.question}>{item.question}</li>
				)) : data?.listQuestion.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
			<div className="flex space-x-2">
				{testimonialSpace.video && (
					<Button
						variant={'default'}
						className={`${preview ? 'hover:bg-primary' : ''} w-full`}
					>
						{preview ? testimonialSpace.extraSettings.videoButtonText : data?.extraSettings.videoButtonText}
					</Button>
				)}
				{testimonialSpace.text && (
					<Button
						variant={'default'}
						className={`${preview ? 'hover:bg-primary' : ''} w-full`}
					>
						{preview ? testimonialSpace.extraSettings.textButtonText : data?.extraSettings.textButtonText}
					</Button>
				)}
			</div>
		</div>
	)
}
