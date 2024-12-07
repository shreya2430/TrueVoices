import { useGetAllTestimonialsQuery } from '@/store/testimonial-api'
import { MasonryFormType } from '@/types/masonry'
import { TestimonialRes } from '@/types/testimonial'
import '@iframe-resizer/child'
import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useTheme } from './Providers/ThemeProvider'
import { TestimonialCard } from './TestimonialCard'

type MasonryWallProps = {
	preview?: boolean
	formSettings?: MasonryFormType
}

// Fisher-Yates shuffle function
const shuffleArray = (array: TestimonialRes[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export const MasonryWall = ({
	preview = false,
	formSettings,
}: MasonryWallProps) => {
	const [searchParam] = useSearchParams()
	const { spaceName } = useParams()
	const { data: testimonials, isSuccess } = useGetAllTestimonialsQuery(spaceName || '', { skip: !spaceName })
	const showDate = preview
	? formSettings?.showDate || false
	: searchParam.get('showDate') === 'true'
	const randomize = preview ? formSettings?.randomize || 'false' : searchParam.get('randomize') === 'true'
	const { setTheme } = useTheme()
	const theme = preview && formSettings?.darkMode ? 'dark' : 'light'
	const cardSize = preview
	? formSettings?.cardSize
	: searchParam.get('cardSize') || 'md'
	const shuffledAndFilteredTestimonials = useMemo(() => {
		const filteredData = testimonials?.filter((item) => item.liked) as TestimonialRes[]
		return randomize ? shuffleArray(filteredData) : filteredData
	}, [randomize, testimonials])
	setTheme(searchParam.get('darkMode') === 'true' ? 'dark' : 'light')

	return (
		<div
			className={`${
				cardSize === 'sm'
					? 'columns-3xs'
					: cardSize === 'md'
					? 'columns-xs'
					: 'columns-md'
			} ${preview && theme} gap-4`}
		>
			{isSuccess && shuffledAndFilteredTestimonials.map((item) => (
				<TestimonialCard
					key={item._id}
					testimonial={item}
					showDate={showDate}
					className={`mb-4 break-inside-avoid-column`}
				/>
			))}
		</div>
	)
}
