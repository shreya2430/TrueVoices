import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface CollectionLinkProps {
	className?: string
}

export const CollectionLink: React.FC<CollectionLinkProps> = ({
	className = '',
}) => {
	const [isCopied, setIsCopied] = useState(false)
  const { spaceName } = useParams();
  const isUrl = `${window.location.origin}/${spaceName}/collect`
	const handleAction = async () => {
		if (isUrl) {
			window.open(isUrl, '_blank')
			return
		}

		try {
			await navigator.clipboard.writeText(isUrl)
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	return (
		<Card className={`w-full h-fit ${className}`}>
			<CardHeader>
					<p className="text-sm text-gray-500 break-all">{isUrl}</p>
			</CardHeader>
			<CardContent>
				<Button
					onClick={handleAction}
					variant="outline"
					className="w-full"
				>
					{isUrl ? (
						<>
							<ExternalLink className="mr-2 h-4 w-4" />
							Visit Link
						</>
					) : (
						<>
							<Copy className="mr-2 h-4 w-4" />
							{isCopied ? 'Copied!' : 'Copy'}
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	)
}
