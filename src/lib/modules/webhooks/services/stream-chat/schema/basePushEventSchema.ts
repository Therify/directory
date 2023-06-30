import * as z from 'zod';

export const schema = z
    .object({
        type: z.string(),
    })
    .passthrough();

export type Type = z.infer<typeof schema>;
