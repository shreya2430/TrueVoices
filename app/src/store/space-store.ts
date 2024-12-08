import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SpaceResType } from '@/types/space'

export const spaceApi = createApi({
	reducerPath: 'spaceApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/v1' }),
	tagTypes: ['Space'],
	endpoints: (builder) => {
		return {
			getAllSpace: builder.query<SpaceResType[], void>({
				query: () => {
					const user = JSON.parse(localStorage.getItem('user') || '');
					return {
						url: '/spaces?userId=' + user.id,
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					};
				},
				providesTags: ['Space'],
			}),
			getSpace: builder.query<SpaceResType, string | undefined>({
				query: (id: string | undefined) => {
					const user = JSON.parse(localStorage.getItem('user') || '');
					if (id) {
						return {
							url: `/spaces/${id}`,
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					}
					throw new Error('Space ID is required')
				},
				providesTags: ['Space'],
			}),
			createSpace: builder.mutation<SpaceResType, SpaceResType>({
				query: (space) => {
					const user = JSON.parse(localStorage.getItem('user') || '');
					return {
						url: '/spaces',
						method: 'POST',
						body: {
							...space,
							userId: user.id,
						},
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					};
				},
				invalidatesTags: ['Space'],
			}),
			updateSpace: builder.mutation<SpaceResType, SpaceResType>({
				query: (space) => {
					const user = JSON.parse(localStorage.getItem('user') || '');
					return {
						url: `/spaces/${space.spaceName}?userId=${user.id}`,
						method: 'PUT',
						body: space,
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					};
				},
				invalidatesTags: ['Space'],
			}),
			deleteSpace: builder.mutation<void, string>({
				query: (spaceName) => {
					const user = JSON.parse(localStorage.getItem('user') || '');
					return {
						url: `/spaces/${spaceName}`,
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					};
				},
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