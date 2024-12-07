import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from './ui/checkbox'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'

type FormCheckboxProps = {
	// Props definition goes here
	className?: string
	name: string
	required?: boolean
	label: string
	disabled?: boolean
}

export const FormCheckbox = ({
	className,
	name,
	required,
	label,
	disabled = false,
}: FormCheckboxProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
			render={({ field }) => (
				<FormItem className="flex items-center gap-2 text-center space-y-0">
					<FormControl>
							<Checkbox
								className={cn('rounded-[0.35rem]', className)}
								id={name}
								disabled={disabled}
								checked={field.value}
                onCheckedChange={field.onChange}
								/>
					</FormControl>
					<FormLabel className='py-2'>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
