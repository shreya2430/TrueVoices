import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadFileApi = createApi({
  reducerPath: 'uploadFile',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/v1' }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{url: string}, { data: FormData, type: string, spaceName: string }>({
      query: ({ data, type, spaceName }) => ({
        url: `/upload/${spaceName}/${type}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUploadFileMutation } = uploadFileApi