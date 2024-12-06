import { useLocation, useParams } from 'react-router-dom'
import { TestimonialDialog } from './TestimonialDialog'
import { TestimonialsList } from './testimonials/TestimonialsList'

export const Display = () => {
	const { space } = useParams()
  const location = useLocation()
	const dummyData = [
		{
			name: 'John Doe',
			companyAndTitle: 'CEO at Company',
			rating: 5,
			testimonialType: 'video',
			address: '1234 Main St, City, State, 12345',
			content:
				'https://www.w3schools.com/html/mov_bbb.mp4',
			createdAt: new Date(),
			profilePic: '',
			socialLinks: '',
			spaceName: '',
		},
		{
			name: 'Jane Doe',
			companyAndTitle: 'CTO at Company',
			rating: 4,
			testimonialType: 'text',
			address: '1234 Main St, City, State, 12345',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec risus nec libero gravida eleifend. Etiam ut magna auctor, fermentum ligula nec, tincidunt dui. Sed nec nisl nec libero gravida eleifend. Etiam ut magna auctor, fermentum ligula nec, tincidunt dui.',
			createdAt: new Date(),
			profilePic: '',
			socialLinks: '',
			spaceName: '',
		},
	]
	return (
		<div className="flex flex-1 flex-col p-4 pt-0">
			<TestimonialsList />
			{space + ' ' + location.pathname}
			{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
			<div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
		</div>
	)
}
