import { Label } from './ui/label'
import { FormInput } from './FormInput'
import { Button } from './ui/button'
import {
	FieldValues,
	Path,
	useFieldArray,
	useFormContext,
} from 'react-hook-form'

type FormFieldInputProp<T extends FieldValues> = {
	// Props definition goes here
	className?: string
	name: Path<T>
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

export const FormFieldInput = <T extends FieldValues>({
	name,
	required,
	label,
	type = 'text',
	accept,
}: FormFieldInputProp<T>) => {
	const { control } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'listQuestion' as const,
		shouldUnregister: false,
	})
	return (
		<div className="space-y-2">
			<Label className="block text-sm font-medium text-gray-700">
				{label || ''}
				{required && <span className="text-red-600"> *</span>}
			</Label>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="flex flex-1 space-x-2"
				>
					<FormInput
						type={type}
						name={`${name}.${index}.question`}
						placeholder={`Question ${index + 1}`}
						required={required}
						accept={accept}
					/>
					<Button
						variant={'outline'}
						onClick={() => remove(index)}
						className="text-red-600 border border-red-600 hover:bg-red-100 hover:text-red-800"
					>
						Remove
					</Button>
				</div>
			))}
			<Button
				variant={'outline'}
				onClick={(e) => {
					e.preventDefault()
					append({ question: '' })
				}}
				disabled={fields.length >= 5}
				className="w-full text-blue-600 border-dashed border-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:border-neutral-500 disabled:text-neutral-500"
			>
				Add Question
			</Button>
		</div>
	)
}
