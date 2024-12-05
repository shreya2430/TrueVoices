import { Testimonial, TestimonialRes } from "@/types/testimonial";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1" }),
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    createTestimonial: builder.mutation({
      query: ({ body, spaceName }: {body: Testimonial, spaceName: string | undefined }) => ({
        url: `/testimonial/${spaceName}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    getAllTestimonials: builder.query<TestimonialRes[], string | undefined>({
      query: (spaceName: string | undefined) => `/testimonials/${spaceName}`,
      providesTags: ["Testimonial"],
    }),
    getTestimonialById: builder.query({
      query: ({ id, spaceName }: { id: string, spaceName: string | undefined }) => `/testimonials/${spaceName}/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Testimonial", id }],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, body, spaceName }: {id: string, body: Testimonial, spaceName: string | undefined }) => ({
        url: `/testimonials/${spaceName}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Testimonial", id }],
    }),
    deleteTestimonial: builder.mutation({
      query: ({ id, spaceName }: { id: string, spaceName: string | undefined }) => ({
        url: `/testimonials/${spaceName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Testimonial", id }],
    }),
  }),
})

export const {
  useCreateTestimonialMutation,
  useGetAllTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;