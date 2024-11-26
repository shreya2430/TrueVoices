import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'

type FormTextareaProps<T extends FieldValues> = {
	// Props definition goes here
	className?: string
	name: Path<T>
	form: UseFormReturn<T>
	required?: boolean
	label: string
	placeholder: string
}

export const FormTextarea = <T extends FieldValues>({
	className,
	name,
	form,
	required,
	label,
	placeholder,
}: FormTextareaProps<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='space-y-1'>
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
					<FormMessage/>
				</FormItem>
			)}
		/>
	)
}
