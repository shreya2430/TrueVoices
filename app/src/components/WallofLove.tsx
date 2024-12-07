import { CarouselForm } from './CarouselForm'
import { MasonryForm } from './MasonryForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export const WallOfLove = () => {
	return (
		<Tabs
			className='m-4'
			defaultValue="carousel"
		>
			<TabsList className='w-full'>
				<TabsTrigger value="carousel" className='w-full'>Carousel</TabsTrigger>
				<TabsTrigger value="masonry" className='w-full'>Masonry</TabsTrigger>
			</TabsList>
			<TabsContent
				value="carousel"
				className="space-y-4 py-4"
			>
				<CarouselForm />
			</TabsContent>
			<TabsContent
				value="masonry"
				className="space-y-4 py-4"
			>
				<MasonryForm />
			</TabsContent>
		</Tabs>
	)
}
