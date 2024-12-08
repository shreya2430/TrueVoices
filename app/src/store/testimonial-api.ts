import { TestimonialReq, TestimonialRes } from "@/types/testimonial";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1" }),
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    createTestimonial: builder.mutation({
      query: ({ body, spaceName }: {body: TestimonialReq, spaceName: string | undefined }) => ({
        url: `/testimonials/${spaceName}`,
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
      providesTags: ["Testimonial"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, body, spaceName }: {id: string, body: TestimonialReq, spaceName: string | undefined }) => ({
        url: `/testimonials/${spaceName}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: builder.mutation({
      query: ({ id, spaceName }: { id: string, spaceName: string | undefined }) => ({
        url: `/testimonials/${spaceName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
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