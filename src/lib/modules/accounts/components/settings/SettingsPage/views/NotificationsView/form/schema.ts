import z from 'zod';

export const schema = z.object({
    isEmailNotificationsOn: z.boolean().default(true),
    email: z.object({
        newMessages: z.boolean().default(true),
        matchProgress: z.boolean().default(true),
    }),
});

export type Type = z.infer<typeof schema>;
