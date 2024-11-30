import { Plus, Trash2 } from 'lucide-react'
import {
	useFieldArray,
	useFormContext
} from 'react-hook-form'
import { FormInput } from './FormInput'
import { Button } from './ui/button'
import { Label } from './ui/label'

type FormFieldInputProp = {
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

export const FormFieldInput = ({
	name,
	required = false,
	label,
	type = 'text',
	accept,
}: FormFieldInputProp) => {
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
				{required && <span className="text-destructive"> *</span>}
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
						variant={'destructive'}
						size={'icon'}
						onClick={() => remove(index)}
					>
						<Trash2 />
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
				className="w-full border-dashed text-foreground border-primary hover:bg-primary/15 space-x-2"
			>
				<Plus />
				Add Question
			</Button>
		</div>
	)
}
