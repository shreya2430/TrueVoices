import { CarouselFormSchema, CarouselFormType } from '@/types/carousel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FormCheckbox } from './FormCheckbox'
import { FormSelect } from './FormSelect'
import { Code } from './ui/code'
import { Form } from './ui/form'
import { CarouselWall } from './CarouselWall'
import { FormInput } from './FormInput'

export const CarouselForm = () => {
	const { spaceName } = useParams()
	const form = useForm<CarouselFormType>({
		resolver: zodResolver(CarouselFormSchema),
		defaultValues: {
			darkMode: false,
			showDate: false,
			autoPlay: false,
			cardSize: 'md',
			autoPlaySpeed: 5,
			showControls: true,
		},
	})
	const location = window.location.origin
	const { darkMode, showDate, autoPlay, cardSize, autoPlaySpeed, showControls } = form.watch()

	return (
		<div className="flex flex-col gap-4">
			<Code
				code={`
          <script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.3.2"></script>
          <iframe id="carousel-embedding" src="${location}/display/carousel/${spaceName}?darkMode=${darkMode}&showDate=${showDate}&autoPlay=${autoPlay}&cardSize=${cardSize}&autoPlaySpeed=${autoPlaySpeed}&showControls=${showControls}" width="100%" frameBorder="0"></iframe>
          <script>iFrameResize({  license: "GPLv3", log: false, waitForLoad: true }, '#carousel-embedding')</script>
        `}
			/>
			<div className='space-y-1'>
				<span className="text-sm">customize</span>
				<Form {...form}>
					<form className="grid grid-cols-2 gap-8 text-foreground">
						<div>
							<div className='grid grid-cols-2 items-start'>
								<div>
									<FormCheckbox
										name="darkMode"
										label="Dark Mode"
									/>
									<FormCheckbox
										name="showDate"
										label="Show Date"
									/>
								</div>
								<div>
									<FormCheckbox
										name="autoPlay"
										label="Auto Play"
									/>
									<FormCheckbox
										name="showControls"
										label="Show Controls"
									/>
								</div>
							</div>
							<FormInput
								name="autoPlaySpeed"
								label="Auto Play Speed (s)"
								type="number"
								placeholder="5"
							/>
						</div>
						<div className='space-y-1'>
							<FormSelect
								name="cardSize"
								label="Card Size"
								items={[
									{ value: 'sm', placeholder: 'Small' },
									{ value: 'md', placeholder: 'Medium' },
									{ value: 'lg', placeholder: 'Large' },
								]}
							/>
						</div>
					</form>
				</Form>
			</div>
			<div className="space-y-1">
				<span className="text-sm">Preview</span>
				<div className={`border rounded-md p-16 lg:p-8 overflow-x-auto flex bg-background ${darkMode ? 'dark' : 'light'}`}>
					<CarouselWall formSettings={form.watch()} preview />
				</div>
			</div>
		</div>
	)
}
