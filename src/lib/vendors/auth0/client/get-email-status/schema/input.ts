import * as z from 'zod';

export const schema = z.object({
    jobId: z.string(),
});

export type Input = z.infer<typeof schema>;
