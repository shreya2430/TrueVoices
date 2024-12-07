import { cn } from '@/lib/utils'
import {
	useFormContext
} from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Textarea } from './ui/textarea'

type FormTextareaProps = {
	// Props definition goes here
	className?: string
	name: string
	required?: boolean
	label: string
	placeholder: string
}

export const FormTextarea = ({
	className,
	name,
	required,
	label,
	placeholder,
}: FormTextareaProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
			render={({ field }) => (
				<FormItem className="space-y-1">
					<FormLabel>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
					<FormControl>
						<Textarea
							placeholder={placeholder}
							className={cn(
								'focus-visible:ring-[3px] focus-visible:ring-offset-0 focus-visible:border-primary/60 focus-visible:ring-ring/20',
								className,
							)}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
