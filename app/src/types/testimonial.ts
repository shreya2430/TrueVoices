import { z } from "zod";

export const TestimonialFormSchema = z.object({
  name: z.string().default("Anonymous"),
  companyAndTitle: z.string().optional(),
  liked: z.boolean().optional(),
  socialLinks: z.string().optional(),
  address: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  testimonialType: z.enum(["text", "video"]),
  profilePic: z.string().url().optional(),
  spaceName: z.string(),
  content: z.string(),
  createdAt: z.date(),
})

export type Testimonial = z.infer<typeof TestimonialFormSchema>

export const TestimonialResSchema = z.object({
  ...TestimonialFormSchema.shape,
  _id: z.string(),
})

export type TestimonialRes = z.infer<typeof TestimonialResSchema>