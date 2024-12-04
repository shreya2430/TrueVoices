import { z } from "zod";

export const TestimonialSchema = z.object({
  name: z.string().default("Anonymous"),
  companyAndTitle: z.string().optional().default(""),
  socialLinks: z.string().optional().default(""),
  address: z.string().optional().default(""),
  rating: z.number().int().min(1).max(5),
  testimonialType: z.enum(["text", "video"]),
  content: z.string(),
  createdAt: z.date(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>
