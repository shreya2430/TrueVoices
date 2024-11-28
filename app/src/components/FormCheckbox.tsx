import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'

type FormInputProps = {
	// Props definition goes here
	className?: string
	name: string
	required?: boolean
	label: string
	placeholder: string
	type?: string
	accept?: string
}

export const FormInput = ({
	className,
	name,
	required,
	label,
	placeholder,
	type = 'text',
	accept,
}: FormInputProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-1">
					<FormLabel>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							className={cn(
								'focus-visible:ring-[3px] focus-visible:ring-offset-0 focus-visible:border-primary/60 focus-visible:ring-ring/20',
								className,
							)}
							accept={accept}
							{...field}
							{...(type === 'file'
								? {
										onChange: (e) => field.onChange(e.target.files?.[0]),
										value: field.value?.fileName,
								  }
								: {})}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
