import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { cn } from '@/lib/utils'
import { Switch } from './ui/switch'

type FormSwitchProps<T extends FieldValues> = {
	// Props definition goes here
	className?: string
	name: Path<T>
	required?: boolean
	label: string
	disabled?: boolean
}

export const FormSwitch = <T extends FieldValues>({
	className,
	name,
	required,
	label,
	disabled = false,
}: FormSwitchProps<T>) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			disabled={disabled}
			render={({ field }) => (
				<FormItem
					className={cn(
						'flex space-y-0 items-center space-x-2 pt-1',
						className,
					)}
				>
					<FormControl>
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
							{...field}
						/>
					</FormControl>
					<FormLabel>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
				</FormItem>
			)}
		/>
	)
}
