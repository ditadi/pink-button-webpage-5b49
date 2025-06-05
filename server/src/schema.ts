
import { z } from 'zod';

// Button configuration schema
export const buttonConfigSchema = z.object({
  id: z.string(),
  text: z.string(),
  color: z.string(),
  action: z.string().nullable(),
});

export type ButtonConfig = z.infer<typeof buttonConfigSchema>;

// Input schema for getting button config
export const getButtonConfigInputSchema = z.object({
  id: z.string().optional(),
});

export type GetButtonConfigInput = z.infer<typeof getButtonConfigInputSchema>;
