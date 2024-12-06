import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { TestimonialCard } from './TestimonialCard'
import { Testimonial } from '@/types/testimonial'
import { TestimonialDialogTrigger } from './TestimonialDialogTrigger'

type TestimonialDialogProps = {
  className?: string
  testimonial: Testimonial
}

export const TestimonialDialog = ({
  className,
  testimonial,
}: TestimonialDialogProps) => {

  return (
    <Dialog>
      <DialogTrigger>
        <TestimonialDialogTrigger />
      </DialogTrigger>
      <DialogContent>
        <TestimonialCard testimonial={testimonial}/>
      </DialogContent>
    </Dialog>
  )
}
