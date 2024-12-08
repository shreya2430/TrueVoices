import { useGetAllSpaceQuery } from '@/store/space-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from './ui/loader'
import { toast } from 'sonner'

export const Intermediate = () => {
  const { data: spaceData, isSuccess, isFetching, isError, error } = useGetAllSpaceQuery()
  const navigate = useNavigate()
  useEffect(() => {
		if (isSuccess && !isFetching && spaceData.length > 0) {
			navigate('/dashboard/' + spaceData[0].spaceName)
		} else if (isSuccess && spaceData.length === 0) {
			navigate('/space-form')
		}
    if (isError) {
      const errorMessage ='status' in error ? error.status : 'Unknown error'
      if (errorMessage === 401) {
        toast.error('Unauthorized')
        navigate('/login')
      } else {
        toast.error('Unknown error')
        navigate('/')
      }
    }
	}, [isSuccess, navigate, spaceData, isFetching, isError])

  return (
    <div>
      {isFetching ? (
        <div className='grid grid-cols-1 place-items-center h-screen w-full'>
          <Loader className='font-black'/>
        </div>
      ) : (
        <div className='grid grid-cols-1 place-items-center h-screen w-full text-2xl font-black'>
          Redirecting...
        </div>
      )}
    </div>
  )
}
