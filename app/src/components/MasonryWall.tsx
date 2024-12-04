import { MasonryFormType } from '@/types/masonry'
import { Testimonial } from '@/types/testimonial'
import '@iframe-resizer/child'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTheme } from './Providers/ThemeProvider'
import { TestimonialCard } from './TestimonialCard'

type MasonryWallProps = {
	preview?: boolean
	formSettings?: MasonryFormType
}

// Fisher-Yates shuffle function
const shuffleArray = (array: Testimonial[]) => {
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
	const dummyData: Testimonial[] = [
		{
			name: 'John Doe',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 4,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 112',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 5,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 34',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 3,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 2',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 4,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 2312',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 5,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 1',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 2,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 421412',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 4,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 5',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 1,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
		{
			name: 'John Doe 7',
			companyAndTitle: 'Acme Inc - CEO',
			rating: 4,
			testimonialType: 'text',
			address: '1234 Elm St, Springfield, IL',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur laborum veritatis labore quos hic nobis sequi error rem repellendus non molestias voluptates possimus fugiat aliquam expedita soluta, culpa suscipit corrupti magni. Cum pariatur vitae reprehenderit voluptates? Corporis, doloribus ipsum.',
			createdAt: new Date(),
			socialLinks: 'https://twitter.com/johndoe',
		},
	]
	// Shuffle the data using useMemo to avoid re-shuffling on every render
	const [searchParam] = useSearchParams()
	const showDate = preview
	? formSettings?.showDate || false
	: searchParam.get('showDate') === 'true'
	const randomize = preview ? formSettings?.randomize || 'false' : searchParam.get('randomize') === 'true'
	const { setTheme } = useTheme()
	const theme = preview && formSettings?.darkMode ? 'dark' : 'light'
	const cardSize = preview
	? formSettings?.cardSize
	: searchParam.get('cardSize') || 'md'
	const shuffledData = useMemo(() => {
		return randomize ? shuffleArray(dummyData) : dummyData
	}, [randomize])
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
			{shuffledData.map((item) => (
				<TestimonialCard
					key={item.name}
					testimonial={item}
					showDate={showDate}
					className={`mb-4 break-inside-avoid-column`}
				/>
			))}
		</div>
	)
}
