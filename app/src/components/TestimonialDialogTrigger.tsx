import { useUpdateTestimonialMutation } from '@/store/testimonial-api'
import { TestimonialRes } from '@/types/testimonial'
import Avatar from 'boring-avatars'
import { EllipsisVertical, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
	AvatarFallback,
	AvatarImage,
	Avatar as ShadcnAvatar,
} from './ui/avatar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Rating } from './ui/rating'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

type TestimonialDialogTriggerProps = {
	testimonial: TestimonialRes
}

export const TestimonialDialogTrigger = ({
	testimonial,
}: TestimonialDialogTriggerProps) => {
	const [liked, setLiked] = useState(testimonial.liked ? true : false)
	const [updateTestimonial, state] = useUpdateTestimonialMutation()
	const handleLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault()
		await updateTestimonial({
			id: testimonial._id,
			body: { ...testimonial, liked: !liked },
			spaceName: testimonial.spaceName,
		})
	}

	useEffect(() => {
		if (state.isSuccess) {
			setLiked(!liked)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isSuccess])

	return (
		<div className="grid grid-cols-6 w-full min-h-44 gap-10 rounded-xl hover:bg-accent/60 p-10">
			<div className="space-y-2 col-span-1 text-start">
				<ShadcnAvatar className="size-16">
					<AvatarImage
						src={testimonial.profilePic}
						alt={testimonial.name}
					/>
					<AvatarFallback>
						<Avatar
							name={testimonial.name}
							variant="beam"
						/>
					</AvatarFallback>
				</ShadcnAvatar>
				<h2 className="text-base font-semibold">{testimonial.name}</h2>
				{testimonial.companyAndTitle && (
					<p className="text-sm">{testimonial.companyAndTitle}</p>
				)}
			</div>
			<div className="col-span-4 flex-1 flex-col text-start justify-start space-y-2">
				<Rating rating={testimonial.rating} />
				{testimonial.testimonialType === 'text' ? (
					<p className="w-full">{testimonial.content}</p>
				) : (
					<div className="rounded-md overflow-hidden max-w-fit">
						<video
							src={testimonial.content}
							controls
							className="w-fit"
						/>
					</div>
				)}
				<p>
					{new Date(testimonial.createdAt).toLocaleDateString('en-US', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</p>
			</div>
			<div className="col-span-1 justify-self-end h-fit w-fit">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={'ghost'}
								size={'icon'}
								onClick={(e) => handleLike(e)}
								disabled={testimonial.consent? false : true}
								className="[&_svg]:size-5"
							>
								<Heart
									className={`${liked ? 'fill-red-600 text-red-600' : ''}`}
								/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add to Wall of Love</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={'ghost'}
							size={'icon'}
							onClick={(e) => e.preventDefault()}
							className="[&_svg]:size-5"
						>
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => console.log('Edit')}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => console.log('Delete')}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
