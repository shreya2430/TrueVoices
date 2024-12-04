import { useGetAllSpaceQuery } from '@/store/space-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Intermediate = () => {
  const { data: spaceData, isSuccess, isFetching } = useGetAllSpaceQuery()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess && spaceData.length > 0) {
      navigate('/dashboard/' + spaceData[0].spaceName)
    } else if (isSuccess && spaceData.length === 0) {
      navigate('/space-form')
    }
  }, [isSuccess])

  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  )
}
