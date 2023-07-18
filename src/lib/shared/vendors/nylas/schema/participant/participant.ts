import z from 'zod';

export const schema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export type Type = z.infer<typeof schema>;
