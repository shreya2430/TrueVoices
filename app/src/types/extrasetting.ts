import { z } from "zod";

export const ExtraSettingsSchema = z.object({
  videoButtonText: z.string().min(1, "Video button text is required").max(50, "Video button text must be 50 characters or less"),
  textButtonText: z.string().min(1, "Text button text is required").max(50, "Text button text must be 50 characters or less"),
  consentDisplay: z.boolean().default(false),
  consentStatement: z.string().min(1, "Consent statement is required").max(500, "Consent statement must be 500 characters or less"),
  questionLabel: z.string().min(1, "Question label is required").max(200, "Question label must be 200 characters or less"),
  autoPopulateTestimonials: z.boolean(),
});

export type ExtraSetting = z.infer<typeof ExtraSettingsSchema>;