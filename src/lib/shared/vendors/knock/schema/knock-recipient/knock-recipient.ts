import z from 'zod';

export const schema = z.object({
    id: z.string(),
    givenName: z.string(),
    surname: z.string().optional(),
    email: z.string().email(),
});

export type Type = z.infer<typeof schema>;
