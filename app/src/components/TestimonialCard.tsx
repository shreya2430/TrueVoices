import { cn } from '@/lib/utils'
import { TestimonialRes } from '@/types/testimonial'
import Avatar from 'boring-avatars'
import { AvatarFallback, AvatarImage, Avatar as ShadcnAvatar } from './ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Rating } from './ui/rating'

type TestimonialCardProps = {
  className?: string
  testimonial: TestimonialRes
  showDate?: boolean
}

export const TestimonialCard = ({ className, testimonial, showDate=true }: TestimonialCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className='flex flex-row space-y-0 gap-2 items-center p-5'>
      <ShadcnAvatar className="size-16">
					<AvatarImage
						src={testimonial.profilePic}
						alt={testimonial.name}
					/>
					<AvatarFallback>
						<Avatar
							name={testimonial.name}
							variant="beam"
						/>
					</AvatarFallback>
				</ShadcnAvatar>
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
          <div className='rounded-md overflow-hidden'>
            <video src={testimonial.content} controls className='w-full h-full'/>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {showDate && new Date(testimonial.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
      </CardFooter>
    </Card>
  )
}
