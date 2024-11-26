import { cn } from '@/lib/utils'
import { Button } from './ui/button'

type TestimonialPageProps = {
	// Props definition goes here
	className?: string
	tittle: string
	details: string
	question: string[]
	text: boolean
	video: boolean
}

export const TestimonialPage = ({
	className,
	tittle,
	details,
	question,
	text,
	video,
}: TestimonialPageProps) => {
	return (
		<div
			className={cn(
				'flex flex-col space-y-8 text-base max-w-xl mx-auto p-10',
				className,
			)}
		>
			<div className="flex flex-col text-center space-y-6">
				<img
					className="aspect-square rounded-xl h-20 w-20 self-center object-cover"
					src="https://live.staticflickr.com/65535/53405989488_c12c5b2532.jpg"
					alt="NASA&#x27;s Webb Rings in the Holidays with the Ringed Planet Uranus"
				/>
				<h1 className="text-4xl font-bold">{tittle}</h1>
				<p className="text-xl">{details}</p>
			</div>
			<ul className="flex flex-col space-y-1 max-w-xl">
				<h3 className="text-2xl font-bold">Questions</h3>
				<div className="h-1 rounded bg-neutral-950 w-20" />
				{question.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
			<div className="flex space-x-2">
				{video && (
					<Button
						variant={'default'}
						className="w-full"
					>
						Record Video
					</Button>
				)}
				{text && (
					<Button
						variant={'default'}
						className="w-full"
					>
						Send Text
					</Button>
				)}
			</div>
		</div>
	)
}
