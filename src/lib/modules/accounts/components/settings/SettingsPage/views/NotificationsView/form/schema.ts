import { createFalse } from 'typescript';
import z from 'zod';

export const schema = z
    .object({
        isEmailNotificationsOn: z.boolean(),
        email: z.object({
            newMessages: z.boolean().default(false),
            matchProgress: z.boolean().default(false),
        }),
    })
    .transform((data) => {
        if (!data.isEmailNotificationsOn) {
            return {
                email: {
                    newMessages: false,
                    matchProgress: false,
                },
            };
        }

        if (data.isEmailNotificationsOn) {
            const isAllFalse = Object.values(data.email).every(
                (value) => !value
            );
            if (isAllFalse) {
                return {
                    email: {
                        newMessages: true,
                        matchProgress: true,
                    },
                };
            }
        }
        return data;
    });

export type Type = z.infer<typeof schema>;
