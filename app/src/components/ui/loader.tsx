import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

type LoaderProps = {
  className?: string
}

export const Loader = ({
  className
}: LoaderProps) => {
  return (
		<LoaderCircle
			className={cn('size-8 animate-spin text-zinc-400', className)}
		/>
	)
}
