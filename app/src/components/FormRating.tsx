import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type FormRatingProps = {
	className?: string
	name: string
	required?: boolean
	label: string
	disabled?: boolean
}

const ratingItems =  [
  { icon: "😠", value: '1', id: 'rating-1' },
  { icon: "🙁", value: '2', id: 'rating-2' },
  { icon: "😐", value: '3', id: 'rating-3' },
  { icon: "😁", value: '4', id: 'rating-4' },
  { icon: "😍", value: '5', id: 'rating-5' },
]

export const FormRating = ({
	className,
	name,
	required,
	label,
	disabled = false,
}: FormRatingProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			rules={{ required }}
			disabled={disabled}
			render={({ field }) => (
				<FormItem className={cn('space-y-2', className)}>
					<FormLabel>
						{label}
						{required && <span className="text-destructive"> *</span>}
					</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex group/radio w-fit"
						>
              {ratingItems.map((item) => (
                <FormItem
                  key={item.id}
                  className='group'
                >
                  <FormLabel className='text-4xl cursor-pointer transition-all group-hover/radio:grayscale group-hover:!grayscale-0 group-has-[[data-state="checked"]]/radio:grayscale group-has-[[data-state="checked"]]:!grayscale-0'>
                    <FormControl>
                      <RadioGroupItem
                        value={item.value}
                        className="sr-only after:inset-0 after:absolute"
                      />
                    </FormControl>
                    {item.icon}
                  </FormLabel>
                </FormItem>
              ))}
						</RadioGroup>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}