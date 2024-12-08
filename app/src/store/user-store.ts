import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserRes, User, UserResponse } from '@/types/user';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/v1' }),
	tagTypes: ['User', 'getUser'],
	endpoints: (builder) => {
		return {
			register: builder.mutation<UserResponse, User>({
				query: (user) => ({
					url: '/auth/register',
					method: 'POST',
					body: user,
				}),
				invalidatesTags: ['User'],
			}),
			login: builder.mutation<User, { email: string; password: string }>({
				query: ({ email, password }) => ({
					url: '/auth/login',
					method: 'POST',
					body: { email, password },
				}),
				invalidatesTags: ['User'],
			}),
			getUser: builder.query<getUserRes, string>({
				query: (id: string) => `/users/${id}`,
				providesTags: ['getUser'],
			}),
			deleteUser: builder.mutation<void, string>({
				query: (id: string) => ({
					url: `/users/${id}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['User'],
			}),
		}
	},
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useDeleteUserMutation,
} = userApi;