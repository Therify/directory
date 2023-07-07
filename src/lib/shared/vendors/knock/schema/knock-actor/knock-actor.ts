import z from 'zod';

export const schema = z.object({
    id: z.string(),
    name: z.string(),
});

export type Type = z.infer<typeof schema>;
