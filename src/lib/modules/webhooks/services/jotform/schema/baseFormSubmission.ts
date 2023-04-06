import * as z from 'zod';

export const schema = z
    .object({
        slug: z.string(),
    })
    .passthrough();

export type FormSubmission = z.infer<typeof schema>;
