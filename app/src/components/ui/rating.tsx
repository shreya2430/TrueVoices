import { Star } from 'lucide-react'
import React from 'react'

type RatingProps = {
  rating: number
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < rating
        return (
          <Star key={index} size={20} className={`${isFilled ? 'fill-yellow-400 text-yellow-400': 'fill-zinc-200 dark:fill-zinc-500 text-zinc-200 dark:text-zinc-500'}`}/>
        )
      })}
    </div>
  )
}
