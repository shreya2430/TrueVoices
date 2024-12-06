import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SpaceResType } from '@/types/space'

export const spaceApi = createApi({
	reducerPath: 'spaceApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/v1' }),
	tagTypes: ['Space'],
	endpoints: (builder) => {
		return {
			getAllSpace: builder.query<SpaceResType[], void>({
				query: () => '/spaces',
				providesTags: ['Space'],
			}),
			getSpace: builder.query<SpaceResType, string>({
				query: (id: string) => `/spaces/${id}`,
				providesTags: (result, error, id) => [{ type: 'Space', id }],
			}),
			createSpace: builder.mutation<SpaceResType, SpaceResType>({
				query: (space) => ({
					url: '/spaces',
					method: 'POST',
					body: space,
				}),
				invalidatesTags: ['Space'],
			}),
			updateSpace: builder.mutation<SpaceResType, SpaceResType>({
				query: (space) => ({
					url: `/spaces/${space.spaceName}`,
					method: 'PUT',
					body: space,
				}),
				invalidatesTags: (result, error, sapce) => [
					{ type: 'Space', id: sapce.spaceName },
				],
			}),
			deleteSpace: builder.mutation<void, string>({
				query: (spaceName) => ({
					url: `/spaces/${spaceName}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Space'],
			}),
		}
	},
})

export const {
	useGetAllSpaceQuery,
	useGetSpaceQuery,
	useCreateSpaceMutation,
	useUpdateSpaceMutation,
	useDeleteSpaceMutation,
} = spaceApi