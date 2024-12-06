import { z } from "zod";

export const ExtraSettingsSchema = z.object({
  maxVideoDuration: z.number().positive("Max video duration must be positive").int("Max video duration must be an integer").max(3600, "Max video duration cannot exceed 1 hour"),
  maxTextCharacters: z.number().positive("Max text characters must be positive").int("Max text characters must be an integer").max(10000, "Max text characters cannot exceed 10,000"),
  videoButtonText: z.string().min(1, "Video button text is required").max(50, "Video button text must be 50 characters or less"),
  textButtonText: z.string().min(1, "Text button text is required").max(50, "Text button text must be 50 characters or less"),
  consentDisplay: z.boolean().default(false),
  consentStatement: z.string().min(1, "Consent statement is required").max(500, "Consent statement must be 500 characters or less"),
  questionLabel: z.string().min(1, "Question label is required").max(200, "Question label must be 200 characters or less"),
  affiliateLink: z.string().url("Invalid affiliate link URL").or(z.literal("")),
  thirdPartyReviewLink: z.string().url("Invalid third party review link URL").or(z.literal("")),
  autoPopulateTestimonials: z.boolean(),
  disableVideoForiOS: z.boolean(),
  allowSearchEngines: z.boolean()
});

export type ExtraSetting = z.infer<typeof ExtraSettingsSchema>;