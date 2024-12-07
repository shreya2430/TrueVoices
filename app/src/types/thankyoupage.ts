import { z } from "zod";

export const ThankYouPageSchema = z.object({
  imageUrl: z.string().url(),
  image: z.instanceof(File, { message: "Image is required" }),
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  message: z.string().min(1, "Message is required").max(500, "Message must be 500 characters or less"),
  allowShareOnSocialMedia: z.boolean()
});

export type ThankYouPage = z.infer<typeof ThankYouPageSchema>;