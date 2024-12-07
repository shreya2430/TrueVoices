import { cn } from '@/lib/utils'
import { useGetAllTestimonialsQuery } from '@/store/testimonial-api'
import { CarouselFormType } from '@/types/carousel'
import { TestimonialRes } from '@/types/testimonial'
import '@iframe-resizer/child'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay'
import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useTheme } from './Providers/ThemeProvider'
import { TestimonialCard } from './TestimonialCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

type CarouselWallProps = {
	className?: string
	preview?: boolean
	formSettings?: CarouselFormType
}

export const CarouselWall = ({ preview=false, formSettings }: CarouselWallProps) => {
	// const dummyData: Testimonial[] = [
	// 	{
	// 		name: 'John Doe',
	// 		companyAndTitle: 'Acme Inc - CEO',
	// 		rating: 4,
	// 		testimonialType: 'text',
	// 		address: '1234 Elm St, Springfield, IL',
	// 		content:
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	// 		createdAt: new Date(),
	// 		socialLinks: 'https://twitter.com/johndoe',
	// 	},
	// 	{
	// 		name: 'John Doe 2',
	// 		companyAndTitle: 'Acme Inc - CEO',
	// 		rating: 4,
	// 		testimonialType: 'text',
	// 		address: '1234 Elm St, Springfield, IL',
	// 		content:
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	// 		createdAt: new Date(),
	// 		socialLinks: 'https://twitter.com/johndoe',
	// 	},
	// 	{
	// 		name: 'John Doe 1',
	// 		companyAndTitle: 'Acme Inc - CEO',
	// 		rating: 4,
	// 		testimonialType: 'text',
	// 		address: '1234 Elm St, Springfield, IL',
	// 		content:
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	// 		createdAt: new Date(),
	// 		socialLinks: 'https://twitter.com/johndoe',
	// 	},
	// 	{
	// 		name: 'John Doe 1',
	// 		companyAndTitle: 'Acme Inc - CEO',
	// 		rating: 4,
	// 		testimonialType: 'text',
	// 		address: '1234 Elm St, Springfield, IL',
	// 		content:
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	// 		createdAt: new Date(),
	// 		socialLinks: 'https://twitter.com/johndoe',
	// 	},
	// ]
	const { spaceName } = useParams()
	const { data: testimonials, isSuccess, isFetching } = useGetAllTestimonialsQuery(spaceName || '', { skip: !spaceName });
	const [searchParam] = useSearchParams()
	const showDate = preview ? formSettings?.showDate : searchParam.get('showDate') === 'true'
	const { setTheme } = useTheme()
	const theme = preview && formSettings?.darkMode ? 'dark' : 'light'
	const autoPlay = preview ? formSettings?.autoPlay : searchParam.get('autoPlay') === 'true'
	const cardSize = preview ? formSettings?.cardSize : searchParam.get('cardSize') || 'md'
	const autoPlaySpeed = preview ? formSettings?.autoPlaySpeed : searchParam.get('autoPlaySpeed') || 5
	const showControls = preview ? formSettings?.showControls : searchParam.get('showControls') === 'true'
	useEffect(() =>
		setTheme(searchParam.get('darkMode') === 'true' ? 'dark' : 'light')
	, [searchParam, setTheme])
	const filteredTestimonials = useMemo(() => testimonials?.filter((item: TestimonialRes) => item.liked), [testimonials]) as TestimonialRes[]

	const autoplayOptions: AutoplayOptionsType = autoPlay ? { delay: 1000 * Number(autoPlaySpeed), stopOnMouseEnter: true, stopOnInteraction: false, active: true } : { active: false }
	return (
		<>
			<Carousel
				className={cn(`${preview && theme}`, `${cardSize === 'sm' ? 'max-w-sm md:max-w-3xl' : cardSize === 'md' ? 'max-w-md md:max-w-4xl' : 'max-w-lg md:max-w-5xl' } mx-auto`)}
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[Autoplay(autoplayOptions)]}
			>
				<CarouselContent className=''>
					{isFetching && <div>Loading...</div>}
					{!isSuccess && !isFetching && <div>No testimonials found</div>}
					{isSuccess && filteredTestimonials.map((item: TestimonialRes) => (
						<CarouselItem
							key={item._id}
							className={`ml-0 md:basis-1/2`}
						>
							<TestimonialCard testimonial={item} showDate={showDate} className={`${cardSize === 'sm' ? 'max-w-sm' : cardSize === 'md' ? 'max-w-md' : 'max-w-lg' } mx-auto`}/>
						</CarouselItem>
					))}
				</CarouselContent>
				{showControls && (
					<>
						<CarouselPrevious className='text-accent-foreground'/>
						<CarouselNext className='text-accent-foreground'/>
					</>
				)}
			</Carousel>
		</>
	)
}
