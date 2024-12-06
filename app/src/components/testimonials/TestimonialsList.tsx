import { useGetAllTestimonialsQuery } from '@/store/testimonial-api'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { TestimonialDialog } from '../TestimonialDialog'
import { Loader } from '../ui/loader'
import { Separator } from '../ui/separator'
import { TestimonialRes } from '@/types/testimonial'

export const TestimonialsList = () => {
	const { space } = useParams()
	const location = useLocation().pathname.split('/').pop() || 'all'
	const {
		data: testimonials,
		isSuccess,
		isFetching,
	} = useGetAllTestimonialsQuery(space)
	const filteredTestimonials: TestimonialRes[] | undefined = useMemo(() => {
		if (location === 'all') return testimonials
		return testimonials?.filter(
			(testimonial) => testimonial.testimonialType === location,
		)
	}, [testimonials, location])

	return (
		<div>
			{isFetching && <Loader />}
			{isSuccess && !isFetching && (
				<>
					{filteredTestimonials?.map((testimonial) => (
                        <>
                            <Separator className='my-3'/>
                            <TestimonialDialog
                                key={testimonial._id}
                                testimonial={testimonial}
                            />
                        </>
					))}
                    <Separator className='my-3'/>
				</>
			)}
		</div>
	)
}
