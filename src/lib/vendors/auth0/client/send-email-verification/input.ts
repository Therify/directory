import * as z from 'zod';

export const schema = z.object({
    userId: z.string(),
});

export type Input = z.infer<typeof schema>;
