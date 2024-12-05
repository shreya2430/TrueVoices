import { cn } from '@/lib/utils'
import { Testimonial } from '@/types/testimonial'
import Avatar from 'boring-avatars'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Rating } from './ui/rating'

type TestimonialCardProps = {
  className?: string
  testimonial: Testimonial
  showDate?: boolean
}

export const TestimonialCard = ({ className, testimonial, showDate=true }: TestimonialCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className='flex flex-row space-y-0 gap-2 items-center p-5'>
        <Avatar className='size-12' name={testimonial.name} variant="beam" />
        <div className='flex justify-start flex-col'>
          <h2 className='text-base font-semibold'>{testimonial.name}</h2>
          {testimonial.companyAndTitle && <p className='text-sm'>{testimonial.companyAndTitle}</p>}
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Rating rating={testimonial.rating} />
        {testimonial.testimonialType === 'text' ? (
          <p>{testimonial.content}</p>
        ) : (
          <video src={testimonial.content} controls />
        )}
      </CardContent>
      <CardFooter>
        {showDate && new Date(testimonial.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
      </CardFooter>
    </Card>
  )
}
