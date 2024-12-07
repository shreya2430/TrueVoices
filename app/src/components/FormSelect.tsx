import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

type FormSelectProps = {
	className?: string
	name: string
	required?: boolean
	label: string
	disabled?: boolean
	items: { value: string; placeholder: string }[]
}

export const FormSelect = ({
	className,
	name,
	required,
	label,
	disabled = false,
	items,
}: FormSelectProps) => {
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
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
						>
							<SelectTrigger
								className={cn(
									'focus-visible:ring-[3px] focus-visible:ring-offset-0 focus-visible:border-primary/60 focus-visible:ring-ring/20',
									className,
								)}
							>
								<SelectValue placeholder={label} />
							</SelectTrigger>
							<SelectContent>
								{items.map((item) => (
									<SelectItem value={item.value} key={item.value}>{item.placeholder}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
