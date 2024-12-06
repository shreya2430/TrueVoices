import { defaultSpaceData } from '@/lib/space-default'
import { urlToFile } from '@/lib/utils'
import { useUploadFileMutation } from '@/store/file-upload-api'
import { useGetSpaceQuery, useUpdateSpaceMutation } from '@/store/space-store'
import { Space, SpaceResSchema, SpaceResType, SpaceSchema } from '@/types/space'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { SpaceFormTab } from './SpaceFormTab'

export const UpdateSpcaeForm = () => {
	const { space } = useParams() as { space: string }
	const { data: currentSpace, isSuccess: spaceGetSuccess } =
		useGetSpaceQuery(space)
	const form = useForm<Space>({
		resolver: zodResolver(SpaceSchema),
		defaultValues: defaultSpaceData,
	})
	const [uploadFile] = useUploadFileMutation()
	const [updateSpace, { isError, isSuccess }] = useUpdateSpaceMutation()

	const handleSumbit = async (data: Space) => {
		const formData = new FormData()
		formData.append('file', data.spaceLogo)
		const profilePic = await uploadFile({
			data: formData,
			type: 'image',
			spaceName: data.spaceName,
		})
    formData.delete('file')
    formData.append('file', data.thankYouPage.image)
    const thankYouPic = await uploadFile({
      data: formData,
      type: 'gif',
      spaceName: data.spaceName,
    })
		const spacePayload: SpaceResType = SpaceResSchema.parse({
			...data,
			spaceLogo: profilePic.data?.url,
      thankYouPage: {
        ...data.thankYouPage,
        imageUrl: thankYouPic.data?.url,
      },
			listQuestion: data.listQuestion.map((que) => que.question),
		})
    console.log(spacePayload)
		await updateSpace(spacePayload)
	}

	useEffect(() => {
		if (isSuccess) {
      console.log('Success')
			form.reset()
		}
		if (isError) {
			alert('Failed to update space')
		}
	}, [isSuccess, isError])

	useEffect(() => {
		const convertData = async () => {
			if (spaceGetSuccess) {
				const spaceLogo = await urlToFile(currentSpace.spaceLogo)
				const thankYouPageImage = await urlToFile(
					currentSpace.thankYouPage.imageUrl,
				)
				form.reset({
					...currentSpace,
					spaceLogoUrl: currentSpace.spaceLogo,
					spaceLogo,
					thankYouPage: {
						...currentSpace.thankYouPage,
						image: thankYouPageImage,
					},
					listQuestion: currentSpace.listQuestion.map((que) => ({
						question: que,
					})),
				})
			}
		}
		convertData()
	}, [spaceGetSuccess])

	return (
		<Form {...form}>
			{spaceGetSuccess && (
        <>
          <SpaceFormTab
            onSubmit={handleSumbit}
            className="p-4"
            id={'update-form'}
          >
            <Button
              variant={'default'}
              type='submit'
              form="update-form"
              className='mt-4'
            >
              Update
            </Button>
          </SpaceFormTab>
        </>
			)}
		</Form>
	)
}
