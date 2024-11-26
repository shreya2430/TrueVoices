import { Space } from '@/types/space'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { FormSwitch } from '../FormSwitch'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { FormRadio } from '../FormRadio'

type GeneralFormProps = {
	// Props definition goes here
	className?: string
}

export const GeneralForm = ({ className }: GeneralFormProps) => {
	const form = useFormContext<Space>()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'listQuestion' as const,
	})
	// Watch the enabled switches
	const nameEnabled = useWatch({
		control: form.control,
		name: 'inputs.name_enabled',
	})
	const emailEnabled = useWatch({
		control: form.control,
		name: 'inputs.email_enabled',
	})
	const companyAndTitleEnabled = useWatch({
		control: form.control,
		name: 'inputs.companyAndTitle_enabled',
	})
	const socialLinksEnabled = useWatch({
		control: form.control,
		name: 'inputs.socialLinks_enabled',
	})
	const addressEnabled = useWatch({
		control: form.control,
		name: 'inputs.address_enabled',
	})

	return (
		<div className={cn('flex flex-col space-y-4', className)}>
			<FormInput
				form={form}
				name="spaceName"
				label="Space Name"
				placeholder="Enter space name"
			/>
			<FormInput
				form={form}
				name="spaceLogo"
				label="Space Logo"
				placeholder="Enter space logo URL"
			/>
			<FormInput
				form={form}
				name="headerTitle"
				label="Header Title"
				placeholder="Enter header title"
			/>
			<FormTextarea
				form={form}
				name="customMessage"
				label="Custom Message"
				placeholder="Enter custom message"
			/>
			<div className="space-y-2">
				<Label className="block text-sm font-medium text-gray-700">
					List Questions
				</Label>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="flex flex-1 space-x-2 space-y-1"
					>
						<FormInput
							form={form}
							name={`listQuestion.${index}.question`}
							placeholder={`Question ${index + 1}`}
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
					className="w-full text-blue-600 border-dashed border-blue-600 hover:bg-blue-100 hover:text-blue-800"
				>
					Add Question
				</Button>
			</div>
			<FormSwitch
				form={form}
				name="starRating"
				label="Enable Star Rating"
			/>
			<FormSwitch
				form={form}
				name="text"
				label="Enable Text Testimonials"
			/>
			<FormSwitch
				form={form}
				name="video"
				label="Enable Video Testimonials"
			/>
			<FormRadio
        form={form}
        name={'themes'}
        label="Display Type"
        options={[
          { value: 'Light', label: 'Light' },
          { value: 'Dark', label: 'Dark' },
        ]}
      />
			<div>
				<h3 className="text-lg font-semibold mb-2">Input Settings</h3>
				<div className="grid grid-cols-2 gap-4">
					<FormSwitch
						form={form}
						name={'inputs.name_enabled'}
						label="Name Enabled"
					/>
					<FormSwitch
						form={form}
						name={'inputs.name_required'}
						label="Name Required"
						disabled={!nameEnabled}
					/>
					<FormSwitch
						form={form}
						name={'inputs.email_enabled'}
						label="Email Enabled"
					/>
					<FormSwitch
						form={form}
						name={'inputs.email_required'}
						label="Email Required"
						disabled={!emailEnabled}
					/>
					<FormSwitch
						form={form}
						name={'inputs.companyAndTitle_enabled'}
						label="Company & Title Enabled"
					/>
					<FormSwitch
						form={form}
						name={'inputs.companyAndTitle_required'}
						label="Company & Title Required"
						disabled={!companyAndTitleEnabled}
					/>
					<FormSwitch
						form={form}
						name={'inputs.socialLinks_enabled'}
						label="Social Links Enabled"
					/>
					<FormSwitch
						form={form}
						name={'inputs.socialLinks_required'}
						label="Social Links Required"
						disabled={!socialLinksEnabled}
					/>
					<FormSwitch
						form={form}
						name={'inputs.address_enabled'}
						label="Address Enabled"
					/>
					<FormSwitch
						form={form}
						name={'inputs.address_required'}
						label="Address Required"
						disabled={!addressEnabled}
					/>
				</div>
			</div>
		</div>
	)
}
