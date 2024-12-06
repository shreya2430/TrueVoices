import React from 'react'
import { Avatar } from './ui/avatar'
import { Testimonial } from '@/types/testimonial'

type TestimonialDialogTriggerProps = {
  testimonial: Testimonial
}

export const TestimonialDialogTrigger = ({
  testimonial,
}: TestimonialDialogTriggerProps) => {
	return (
		<div>
			<div>
				<Avatar
					className="size-12"
					name={testimonial.name}
					variant="beam"
				/>
				<div className="flex justify-start flex-col">
					<h2 className="text-base font-semibold">{testimonial.name}</h2>
					{testimonial.companyAndTitle && (
						<p className="text-sm">{testimonial.companyAndTitle}</p>
					)}
				</div>
			</div>
		</div>
	)
}
