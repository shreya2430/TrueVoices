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
import { Loader } from '../ui/loader'
import { SpaceFormTab } from './SpaceFormTab'
import { toast } from 'sonner'

export const UpdateSpcaeForm = () => {
	const { spaceName } = useParams()
	const { data: currentSpace, isSuccess: spaceGetSuccess, isFetching: spaceFetching } =
		useGetSpaceQuery(spaceName || '', { skip: !spaceName, refetchOnReconnect: true, refetchOnFocus: true })
	const form = useForm<Space>({
		resolver: zodResolver(SpaceSchema),
		defaultValues: defaultSpaceData,
	})
	const [uploadFile] = useUploadFileMutation()
	const [updateSpace, { isError, isSuccess, isLoading, error }] = useUpdateSpaceMutation()

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
			toast.success('Space updated successfully')
		}
		if (isError) {
			console.log('Error')
			const errorMessage = 'status' in error ? error.status : 'Unknown error'
			toast.error('Failed to update space: ' + errorMessage)
		}
	}, [isSuccess, isError, form, error])

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spaceGetSuccess])

	return (
		<Form {...form}>
			{spaceFetching && 
				<div className='grid col-span-1 h-full place-items-center'>
					<Loader />
				</div>
			}
			{spaceGetSuccess && !spaceFetching && (
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
              className='mt-4 space-x-2'
							disabled={isLoading}
            >
							{isLoading && <Loader />}
              Update
            </Button>
          </SpaceFormTab>
        </>
			)}
		</Form>
	)
}
