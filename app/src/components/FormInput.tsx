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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
	min?: number
	max?: number
}

export const FormInput = ({
	className,
	name,
	required,
	label,
	placeholder,
	type = 'text',
	min,
	max,
	accept,
}: FormInputProps) => {
	const { control, setValue, watch } = useFormContext()
	const [fileName, setFileName] = useState<string | null>(null)
	useEffect(() => {
		const value = watch(name)
		if (type === 'file') {
			setFileName(value?.name || null)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch(name)])

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
			render={({ field }) => (
				<FormItem className="space-y-1 w-full">
					{label &&
						<FormLabel>
							{label}
							{required && <span className="text-destructive"> *</span>}
							{type === 'file' ? (
								<div className="flex items-center space-x-3 px-4 py-3 mt-2 border border-dashed rounded-md">
									<Avatar className='rounded-lg size-12'>
										<AvatarImage src={watch(name+'Url')} className='object-cover'/>
										<AvatarFallback className='rounded-lg size-12 bg-neutral-200'/>
									</Avatar>
									<div className='flex flex-col gap-2'>
										<span className="px-3">Upload file</span>
										<span className='px-3'>{fileName}</span>
									</div>
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
											setValue(name+'Url', e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : '')
										},
										value: field.value?.fileName,
								  }
								: {})}
							{...(type === 'number'
								? {
										inputMode: 'numeric',
										onChange: (e) => field.onChange(Number(e.target.value)),
										min,
										max,
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
