import { useGetAllTestimonialsQuery } from '@/store/testimonial-api'
import { Fragment, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { TestimonialDialog } from '../TestimonialDialog'
import { Loader } from '@/components/ui/loader'
import { Separator } from '@/components/ui/separator'
import { TestimonialRes } from '@/types/testimonial'

export const TestimonialsList = () => {
	const { spaceName } = useParams()
	const location = useLocation().pathname.split('/').pop() || 'all'
	const {
		data: testimonials,
		isSuccess,
		isFetching,
	} = useGetAllTestimonialsQuery(spaceName || '', { skip: !spaceName })
	const filteredTestimonials: TestimonialRes[] | undefined = useMemo(() => {
		if (location === 'all' || location === spaceName) return testimonials
		return testimonials?.filter(
			(testimonial) => testimonial.testimonialType === location,
		)
	}, [location, spaceName, testimonials])

	return (
		<div className="h-full p-4">
			{isFetching && (
				<div className="grid col-span-1 h-full place-items-center">
					<Loader />
				</div>
			)}
			{isSuccess && !isFetching && (
				<>
					{filteredTestimonials?.length ? (
						filteredTestimonials.map((testimonial) => (
							<Fragment key={testimonial._id}>
								<Separator className="my-3" />
								<TestimonialDialog
									key={testimonial._id}
									testimonial={testimonial}
								/>
							</Fragment>
						))
					) : (
						<div className="grid grid-cols-1 h-full place-items-center">
							<p className="text-2xl text-gray-500">
								You got no testimonials yet 😕
							</p>
						</div>
					)}
					{filteredTestimonials ? filteredTestimonials.length > 0 && <Separator className="my-3" /> : ""}
				</>
			)}
		</div>
	)
}
