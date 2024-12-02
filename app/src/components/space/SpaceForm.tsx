import { defaultSpaceData } from '@/lib/space-default'
import { useUploadFileMutation } from '@/store/file-upload-api'
import { useCreateSpaceMutation } from '@/store/space-store'
import { Space, SpaceResSchema, SpaceResType, SpaceSchema } from '@/types/space'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TestimonialPage } from '../TestimonialPage'
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
import { Form } from '../ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { EmailsettingForm } from './EmailsettingForm'
import { ExtrasettingsForm } from './ExtrasettingsForm'
import { GeneralForm } from './GeneralForm'
import { ThankyouForm } from './ThankyouForm'

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
				<Tabs
					defaultValue="general"
					className="flex gap-12 w-full"
				> 
          <div className='w-[34rem]'>
            <TabsContent value="general">
              <TestimonialPage className='border rounded-md' preview space={form.watch()}/>
            </TabsContent>
            <TabsContent value="thankyou">
              <TestimonialPage className='border rounded-md' preview space={form.watch()}/>
            </TabsContent>
            <TabsContent value="extrasetting">
              <TestimonialPage className='border rounded-md' preview space={form.watch()}/>
            </TabsContent>
            <TabsContent value="emailsetting">
              <TestimonialPage className='border rounded-md' preview space={form.watch()}/>
            </TabsContent>
          </div>
					<Form {...form}>
						<form
							className="flex flex-col justify-between min-h-max flex-1"
							onSubmit={form.handleSubmit(handleSumbit)}
						>
							<div className="space-y-4">
								<TabsList className="w-full">
									<TabsTrigger
										className="w-full"
										value="general"
									>
										General
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="thankyou"
									>
										Thank You
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="extrasetting"
									>
										Extra Setting
									</TabsTrigger>
									<TabsTrigger
										className="w-full"
										value="emailsetting"
									>
										Email Setting
									</TabsTrigger>
								</TabsList>
								<TabsContent value="general">
									<GeneralForm />
								</TabsContent>
								<TabsContent value="thankyou">
									<ThankyouForm />
								</TabsContent>
								<TabsContent value="extrasetting">
									<ExtrasettingsForm />
								</TabsContent>
								<TabsContent value="emailsetting">
									<EmailsettingForm />
								</TabsContent>
							</div>
							<DialogFooter className="mt-6">
								<Button
									variant={'default'}
									className="w-full"
									type="submit"
								>
									Create Space
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}