import { MasonryFormSchema, MasonryFormType } from '@/types/masonry'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FormCheckbox } from './FormCheckbox'
import { FormSelect } from './FormSelect'
import { Code } from './ui/code'
import { Form } from './ui/form'
import { ScrollArea } from './ui/scroll-area'
import { MasonryWall } from './MasonryWall'

export const MasonryForm = () => {
	const { spaceName } = useParams()
	const form = useForm<MasonryFormType>({
		resolver: zodResolver(MasonryFormSchema),
		defaultValues: {
			darkMode: false,
			showDate: false,
			cardSize: 'md',
			randomize: false,
		},
	})
	const location = window.location.origin
	const { darkMode, showDate, cardSize, randomize } = form.watch()

	return (
		<div className="flex flex-col gap-4">
			<Code
				code={`
          <script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.3.2"></script>
          <iframe id="masonry-embedding" src="${location}/display/masonry/${spaceName}?darkMode=${darkMode}&showDate=${showDate}&cardSize=${cardSize}&randomize=${randomize}" width="100%" frameBorder="0"></iframe>
          <script>iFrameResize({  license: "GPLv3", log: false, waitForLoad: true }, '#masonry-embedding')</script>
        `}
			/>
			<div className="space-y-1 text-foreground">
				<span className="text-sm">customize</span>
				<Form {...form}>
					<form className="grid grid-cols-2">
						<div>
							<FormCheckbox
								name="darkMode"
								label="Dark Mode"
							/>
							<FormCheckbox
								name="showDate"
								label="Show Date"
							/>
							<FormCheckbox
								name="randomize"
								label="Randomize"
							/>
						</div>
						<div>
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
				<div className='space-y-1'>
					<span className="text-sm">Preview</span>
					<ScrollArea className="h-[556px] border rounded-md p-8">
						<MasonryWall
							preview
							formSettings={form.watch()}
						/>
					</ScrollArea>
				</div>
			</div>
		</div>
	)
}
