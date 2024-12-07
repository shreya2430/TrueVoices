import { cn } from '@/lib/utils'

type VideoPreviewProps = {
	// Props definition goes here
	className?: string
	videoUrl: string
}

export const VideoPreview = ({ className, videoUrl }: VideoPreviewProps) => {
	return (
		<div className={cn('w-fit h-fit', className)}>
			<video
				className="rounded-md"
				src={videoUrl}
				controls
			/>
		</div>
	)
}
