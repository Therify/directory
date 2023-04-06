import { z } from 'zod';

export const basePreferenceSchema = z.object({
    selection: z.string().optional(),
    isRequired: z.boolean().default(false),
});
