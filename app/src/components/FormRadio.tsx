import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type FormRadioProps = {
	className?: string
	name: string
	required?: boolean
	label: string
	disabled?: boolean
	options: { label: string; value: string }[]
}

export const FormRadio = ({
	className,
	name,
	required,
	label,
	disabled = false,
	options,
}: FormRadioProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
			disabled={disabled}
			render={({ field }) => (
				<FormItem className={cn('space-y-2', className)}>
					<FormLabel>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex space-x-1"
						>
							{options.map((option) => (
								<FormItem
									key={option.value}
									className="flex items-center max-w-max"
								>
									<FormLabel className="relative flex cursor-pointer flex-col items-center gap-3 rounded-md border border-input px-3 py-2 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
										<FormControl>
											<RadioGroupItem
												value={option.value}
												className="sr-only after:inset-0 after:absolute"
											/>
										</FormControl>
										{option.label}
									</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
