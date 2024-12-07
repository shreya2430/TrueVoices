import { cn } from '@/lib/utils'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldInput } from '../FormFieldInput'
import { FormInput } from '../FormInput'
import { FormRadio } from '../FormRadio'
import { FormSwitch } from '../FormSwitch'
import { FormTextarea } from '../FormTextarea'
import { useEffect } from 'react'

type GeneralFormProps = {
	// Props definition goes here
	className?: string
}

/**
 * 
 * @param className
 * @returns JSX.Element
 */
export const GeneralForm = ({ className }: GeneralFormProps) => {
	const form = useFormContext()

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

	useEffect(() => {
		if (nameEnabled === false) form.setValue('inputs.name_required', nameEnabled)
		if (emailEnabled === false) form.setValue('inputs.email_required', emailEnabled)
		if (companyAndTitleEnabled === false) form.setValue('inputs.companyAndTitle_required', companyAndTitleEnabled)
		if (socialLinksEnabled === false) form.setValue('inputs.socialLinks_required', socialLinksEnabled)
		if (addressEnabled === false) form.setValue('inputs.address_required', addressEnabled)
	}, [nameEnabled, emailEnabled, companyAndTitleEnabled, socialLinksEnabled, addressEnabled, form])

	return (
		<div className={cn('flex flex-col space-y-4', className)}>
			<FormInput
				name="spaceName"
				label="Space Name"
				placeholder="Enter space name"
				required
			/>
			<FormInput
				name="spaceLogo"
				className='hidden'
				label="Space Logo"
				placeholder="Enter space logo"
				type="file"
				accept="image/*"
				required
			/>
			<FormInput
				name="headerTitle"
				label="Header Title"
				placeholder="Enter header title"
				required
			/>
			<FormTextarea
				name="customMessage"
				label="Custom Message"
				placeholder="Enter custom message"
				required
			/>

			<FormSwitch
				name="starRating"
				label="Enable Star Rating"
			/>
			<FormSwitch
				name="text"
				label="Enable Text Testimonials"
			/>
			<FormSwitch
				name="video"
				label="Enable Video Testimonials"
			/>
			<FormFieldInput
				name="listQuestion"
				label="List Question"
				placeholder="Enter question"
				required
			/>
			<FormRadio
				name={'themes'}
				label="Display Type"
				options={[
					{ value: 'light', label: 'Light' },
					{ value: 'dark', label: 'Dark' },
				]}
			/>
			<div>
				<h3 className="text-lg font-semibold mb-2">Input Settings</h3>
				<div className="grid grid-cols-2 gap-4">
					<FormSwitch
						name={'inputs.name_enabled'}
						label="Name Enabled"
					/>
					<FormSwitch
						name={'inputs.name_required'}
						label="Name Required"
						disabled={!nameEnabled}
					/>
					<FormSwitch
						name={'inputs.email_enabled'}
						label="Email Enabled"
					/>
					<FormSwitch
						name={'inputs.email_required'}
						label="Email Required"
						disabled={!emailEnabled}
					/>
					<FormSwitch
						name={'inputs.companyAndTitle_enabled'}
						label="Company & Title Enabled"
					/>
					<FormSwitch
						name={'inputs.companyAndTitle_required'}
						label="Company & Title Required"
						disabled={!companyAndTitleEnabled}
					/>
					<FormSwitch
						name={'inputs.socialLinks_enabled'}
						label="Social Links Enabled"
					/>
					<FormSwitch
						name={'inputs.socialLinks_required'}
						label="Social Links Required"
						disabled={!socialLinksEnabled}
					/>
					<FormSwitch
						name={'inputs.address_enabled'}
						label="Address Enabled"
					/>
					<FormSwitch
						name={'inputs.address_required'}
						label="Address Required"
						disabled={!addressEnabled}
					/>
				</div>
			</div>
		</div>
	)
}
