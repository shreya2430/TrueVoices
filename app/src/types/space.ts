import { z } from 'zod';
import { ExtraSettingsSchema } from './extrasetting';
import { ThankYouPageSchema } from './thankyoupage';

const InputsSchema = z.object({
  name_required: z.boolean().optional(),
  name_enabled: z.boolean(),
  email_required: z.boolean().optional(),
  email_enabled: z.boolean(),
  companyAndTitle_required: z.boolean().optional(),
  companyAndTitle_enabled: z.boolean().optional(),
  socialLinks_required: z.boolean().optional(),
  socialLinks_enabled: z.boolean().optional(),
  address_required: z.boolean().optional(),
  address_enabled: z.boolean().optional()
});

export const SpaceSchema = z.object({
  spaceName: z.string().min(1, "Space name is required").max(100, "Space name must be 100 characters or less"),
  spaceLogoUrl: z.string().url(),
  spaceLogo: z.instanceof(File, { message: "Space logo is required" }),
  headerTitle: z.string().min(1, "Header title is required").max(200, "Header title must be 200 characters or less"),
  customMessage: z.string().min(10, "Custom message must be atleast 10 characters").max(500, "Custom message must be 500 characters or less"),
  listQuestion: z.array(z.object({ 
    question: z.string().min(1, "Question is required").max(200, "Question must be 200 characters or less") 
  })).min(1, "At least one question is required").max(5, "Maximum of 5 questions allowed"),
  starRating: z.boolean(),
  text: z.boolean(),
  video: z.boolean(),
  themes: z.enum(['light', 'dark']),
  inputs: InputsSchema,
  thankYouPage: ThankYouPageSchema,
  extraSettings: ExtraSettingsSchema,
});

export type Space = z.infer<typeof SpaceSchema>;

export const SpaceResSchema = z.object({
	...SpaceSchema.shape,
	spaceLogo: z.string().url(),
	thankYouPage: ThankYouPageSchema.omit({ image: true }),
	listQuestion: z.array(z.string()),
})

export type SpaceResType = z.infer<typeof SpaceResSchema>