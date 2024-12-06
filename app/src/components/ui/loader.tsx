import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'

type LoaderProps = {
  className?: string
}

export const Loader = ({
  className
}: LoaderProps) => {
  return (
    <LoaderIcon className={cn('size-8 animate-spin', className)} />
  )
}
