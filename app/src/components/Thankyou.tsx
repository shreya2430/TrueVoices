import { defaultSpaceData } from '@/lib/space-default'
import { cn } from '@/lib/utils'
import { useGetSpaceQuery } from '@/store/space-store'
import { Space } from '@/types/space'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'

type ThankyouProps = {
  // Props definition goes here
  className?: string
  space?: Space
  preview?: boolean
}

export const Thankyou = ({
  className,
  space,
  preview = false,
}: ThankyouProps) => {
  const [testimonialSpace, setTestimonialSpace] = useState<Space>(defaultSpaceData)
	const { spaceName } = useParams();
	const { data: spaceData, isSuccess } = useGetSpaceQuery(spaceName || '', { skip: !spaceName });

	useEffect(() => {
		if (space) {
			setTestimonialSpace(
				space
			)
		}
	}, [space])

  return (
    <>
      {preview && (
        <Card className={cn('w-fit text-foreground bg-background text-center', className)}>
          <CardHeader className='space-y-6'>
            {testimonialSpace.thankYouPage.imageUrl && (
              <picture className='size-fit max-h-45 aspect-video rounded-md overflow-clip'>
                <img src={testimonialSpace.thankYouPage.imageUrl} alt='Thank you (toast)' className='object-cover'/>
              </picture>
            )}
            <p className='text-4xl font-extrabold '>
              {testimonialSpace.thankYouPage.title}
            </p>
          </CardHeader>
          <CardContent>
            <p className='text-lg'>
              {testimonialSpace.thankYouPage.message}
            </p>
          </CardContent>
        </Card>
      )}
      {!preview && isSuccess && (
        <Card className={cn('w-fit text-foreground bg-background text-center', className)}>
          <CardHeader className='space-y-6'>
            {spaceData.thankYouPage.imageUrl && (
              <picture className='size-fit max-h-45 aspect-video rounded-md overflow-clip'>
                <img src={spaceData.thankYouPage.imageUrl} alt='Thank you (toast)' className='object-cover'/>
              </picture>
            )}
            <p className='text-4xl font-extrabold '>
              {spaceData?.thankYouPage.title}
            </p>
          </CardHeader>
          <CardContent>
            <p className='text-lg'>
              {spaceData?.thankYouPage.message}
            </p>
          </CardContent>
        </Card>
      )}
    </>
    // <Card className={cn('w-fit text-foreground bg-background text-center', className)}>
    //   <CardHeader className='space-y-6'>
    //     {preview ? testimonialSpace.thankYouPage.imageUrl && (
    //       <picture className='size-fit max-h-45 aspect-video rounded-md overflow-clip'>
    //         <img src={testimonialSpace.thankYouPage.imageUrl} alt='Thank you (toast)' className='object-cover'/>
    //       </picture>
    //     ) : spaceData?.thankYouPage.imageUrl && (
    //       <picture className='size-fit max-h-45 aspect-video rounded-md overflow-clip'>
    //         <img src={spaceData.thankYouPage.imageUrl} alt='Thank you (toast)' className='object-cover'/>
    //       </picture>
    //     )}
    //     <p className='text-4xl font-extrabold '>
    //       {preview ? testimonialSpace.thankYouPage.title : spaceData?.thankYouPage.title}
    //     </p>
    //   </CardHeader>
    //   <CardContent>
    //     <p className='text-lg'>
    //       {preview ? testimonialSpace.thankYouPage.message : spaceData?.thankYouPage.message}
    //     </p>
    //   </CardContent>
    // </Card>
  )
}
