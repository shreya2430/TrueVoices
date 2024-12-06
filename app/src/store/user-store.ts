import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserResponse } from '@/types/user';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/v1' }),
	tagTypes: ['User'],
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
			getUser: builder.query<User, string>({
				query: (id: string) => `/users/${id}`,
				providesTags: (result, error, id) => [{ type: 'User', id }],
			}),
			deleteUser: builder.mutation<void, string>({
				query: (id: string) => ({
					url: `/users/${id}`,
					method: 'DELETE',
				}),
				invalidatesTags: (result, error, id) => [{ type: 'User', id }],
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