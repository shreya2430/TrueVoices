import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
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
	label?: string
	placeholder: string
	type?:
		| 'text'
		| 'number'
		| 'file'
		| 'email'
		| 'password'
		| 'tel'
		| 'url'
		| 'search'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'month'
		| 'week'
		| 'color'
		| 'range'
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
	const { control, getValues } = useFormContext()
	const [fileName, setFileName] = useState<string | null>(null)

	useEffect(() => {
		if (type === 'file') {
			setFileName(getValues(name)?.name || null)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-1 w-full">
					{label &&
						<FormLabel>
							{label}
							{required && <span className="text-destructive"> *</span>}
							{type === 'file' ? (
								<div className="flex items-center space-x-3 mt-2 border rounded-md">
									<span className="p-3 border-r">Upload file</span>
									<span>{fileName || "choose your file"}</span>
								</div>
							): ''}
						</FormLabel>
					}
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
										onChange: (e) => {
											field.onChange(e.target.files?.[0])
											setFileName(e.target.files?.[0].name || null)
										},
										value: field.value?.fileName,
								  }
								: {})}
							{...(type === 'number'
								? {
										inputMode: 'numeric',
										onChange: (e) => field.onChange(Number(e.target.value)),
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
