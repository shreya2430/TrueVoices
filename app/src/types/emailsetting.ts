import { z } from "zod";

export const EmailSettingsSchema = z.object({
  emailFrom: z.string().email("Invalid email address for 'From' field").max(255, "Email address must be 255 characters or less"),
  emailTo: z.string().email("Invalid email address for 'To' field").max(255, "Email address must be 255 characters or less"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be 200 characters or less"),
  message: z.string().min(1, "Message is required").max(10000, "Message must be 10,000 characters or less")
});

export type EmailSetting = z.infer<typeof EmailSettingsSchema>;