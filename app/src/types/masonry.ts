import { z } from "zod";

export const MasonryFormSchema = z.object({
  darkMode: z.boolean().default(false),
  showDate: z.boolean().default(false),
  cardSize: z.enum(["", "md", "lg"]).default("md"),
  randomize: z.boolean().default(false),
})

export type MasonryFormType = z.infer<typeof MasonryFormSchema>