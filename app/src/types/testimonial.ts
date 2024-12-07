import { z } from "zod";

export const TestimonialFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").default("Anonymous"),
  email: z.string().email("Invalid email format").optional(),
  companyAndTitle: z.string().optional(),
  liked: z.boolean().optional(),
  socialLinks: z.string().optional().refine(value => {
    return value ? value.split(',').every(link => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(link)) : true
  }, { message: "One or more social links are not valid URLs" }),
  address: z.string().optional(),
  rating: z.enum(['1', '2', '3', '4', '5', '']),
  testimonialType: z.enum(["text", "video"]),
  profilePic: z.string().url().optional(),
  profilePicFile: z.instanceof(File).optional(),
  spaceName: z.string().min(1, "Space name is required"),
  videoFile: z.instanceof(File).optional(),
  consent: z.boolean(),
  content: z.string().min(1, "Content is required").optional(),
});

export type Testimonial = z.infer<typeof TestimonialFormSchema>

export const TestimonialReqSchema = TestimonialFormSchema.omit({ profilePicFile: true, videoFile: true }).merge(z.object({
  rating: z.number(),
  content: z.string(),
}));

export type TestimonialReq = z.infer<typeof TestimonialReqSchema>

export const TestimonialResSchema = TestimonialFormSchema.omit({ videoFile: true, profilePicFile: true }).merge(z.object({
  rating: z.number(),
  _id: z.string(),
  content: z.string(),
  createdAt: z.date(),
}));

export type TestimonialRes = z.infer<typeof TestimonialResSchema>