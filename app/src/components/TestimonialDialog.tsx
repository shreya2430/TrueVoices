import { cn } from '@/lib/utils'
import { TestimonialRes } from '@/types/testimonial'
import { DialogOverlay } from '@radix-ui/react-dialog'
import { TestimonialCard } from './TestimonialCard'
import { TestimonialDialogTrigger } from './TestimonialDialogTrigger'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog'

type TestimonialDialogProps = {
	className?: string
	testimonial: TestimonialRes
}

export const TestimonialDialog = ({
  className,
  testimonial,
}: TestimonialDialogProps) => {
  return (
		<Dialog>
			<DialogTrigger className={cn('w-full', className)}>
				<TestimonialDialogTrigger testimonial={testimonial} />
			</DialogTrigger>
      <DialogOverlay />
			<DialogContent className='[&>button]:hidden'>
				<TestimonialCard
					testimonial={testimonial}
					className="border-none shadow-none"
				/>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'} className='w-full tracking-wide'>Close</Button>
          </DialogClose>
        </DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
