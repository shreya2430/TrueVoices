import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Check, Clipboard } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from 'react-code-block'

type CodeProps = {
	code: string
}

export const Code = ({ code }: CodeProps) => {
	const [copied, setCopied] = useState(false)
  const preCode = code.trim().split('\n').map((c) => c.trim()).join('\n')

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(preCode)
			setCopied(true)
			setTimeout(() => setCopied(false), 10000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	return (
		<CodeBlock
			code={preCode}
			language="javascript"
		>
			<div className="relative">
        <div className='bg-zinc-900 dark:bg-zinc-800 rounded-md py-4 px-6'>
          <CodeBlock.Code className="overflow-x-auto w-full no-scrollbar">
            <CodeBlock.LineContent>
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </CodeBlock.Code>
        </div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-3 right-3 rounded-sm size-6 text-zinc-50 hover:text-zinc-50 hover:bg-zinc-200/10"
								onClick={copyToClipboard}
							>
								{copied ? <Check /> : <Clipboard />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</CodeBlock>
	)
}