import z from 'zod';

export const schema = z
    .object({
        name: z.string(),
        description: z.string(),
        location: z.string(),
        timezone: z.string(),
        readOnly: z.boolean().optional(),
        isPrimary: z.boolean().optional(),
        jobStatusId: z.string().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
        hexColor: z.string().optional(),
    })
    .passthrough();

export type Type = z.infer<typeof schema>;
