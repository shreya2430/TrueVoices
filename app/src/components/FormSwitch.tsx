import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Switch } from './ui/switch'

type FormSwitchProps = {
	// Props definition goes here
	className?: string
	name: string
	required?: boolean
	label: string
	disabled?: boolean
}

export const FormSwitch = ({
	className,
	name,
	required,
	label,
	disabled = false,
}: FormSwitchProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
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
