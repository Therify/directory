import * as z from 'zod';

export const schema = z.object({
    status: z.string(),
    jobId: z.string(),
});

export type Output = z.infer<typeof schema>;
