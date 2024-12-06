import { defaultSpaceData } from '@/lib/space-default'
import { useUploadFileMutation } from '@/store/file-upload-api'
import { useCreateSpaceMutation } from '@/store/space-store'
import { Space, SpaceResSchema, SpaceResType, SpaceSchema } from '@/types/space'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { SpaceFormTab } from './SpaceFormTab'

type SpaceFormProps = {
	// Props definition goes here
	children?: React.ReactNode
	open?: boolean
}

export const SpaceForm = ({ children, open }: SpaceFormProps) => {
	const form = useForm<Space>({
		resolver: zodResolver(SpaceSchema),
		defaultValues: defaultSpaceData,
		shouldUnregister: false,
	})
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(open)
  const [createSpace, { isError, isSuccess }] = useCreateSpaceMutation()
  const [uploadFile, state] = useUploadFileMutation()
	const onOpenChange = (open: boolean, url?: string) => {
		setIsOpen(open)
    if (!url) navigate(-1)
		else navigate(url)
	}

  const handleSumbit = async (data: Space) => {
    const formData = new FormData()
    formData.append('file', data.spaceLogo)
    const profilePic = await uploadFile({data: formData, type: 'image', spaceName: data.spaceName});
    formData.delete('file')
    formData.append('file', data.thankYouPage.image)
    const thankYouPageImage = await uploadFile({data: formData, type: 'gif', spaceName: data.spaceName});
    const spacePayload: SpaceResType = SpaceResSchema.parse({
      ...data,
      spaceLogo: profilePic.data?.url,
      thankYouPage: {
        ...data.thankYouPage,
        image: thankYouPageImage.data?.url
      },
      listQuestion: data.listQuestion.map((que) => que.question),
    })

    await createSpace(spacePayload)
  }

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false, `/dashboard/${form.getValues().spaceName}`)
      form.reset()
    }
    if (isError) {
      console.log(state.error)
    }
  }, [isSuccess, isError])

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogOverlay className="backdrop-blur-sm bg-black/70" />
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-screen-xl mx-auto m-8">
				<DialogHeader>
					<DialogTitle>Create Space</DialogTitle>
				</DialogHeader>
				<SpaceFormTab id='space-form' onSubmit={handleSumbit}>
					<DialogFooter>
						<Button
							type="submit"
							form='space-form'
							variant='default'
						>
							Create Space
						</Button>
					</DialogFooter>
				</SpaceFormTab>
			</DialogContent>
		</Dialog>
	)
}