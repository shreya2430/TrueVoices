import { z } from "zod";

export const CarouselFormSchema = z.object({
  darkMode: z.boolean().default(false),
  showDate: z.boolean().default(false),
  autoPlay: z.boolean().default(false),
  cardSize: z.enum(["sm", "md", "lg"]).default("md"),
  autoPlaySpeed: z.number().default(5),
  showControls: z.boolean().default(true),
})

export type CarouselFormType = z.infer<typeof CarouselFormSchema>