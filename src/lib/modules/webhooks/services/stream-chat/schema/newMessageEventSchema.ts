import * as z from 'zod';
import { schema as basePushEventSchema } from './basePushEventSchema';
const memberUserSchema = z
    .object({
        user_id: z.string(),
    })
    .passthrough();

const messageUserSchema = z.object({
    id: z.string(),
    role: z.string(),
    banned: z.boolean(),
    online: z.boolean(),
});

export const schema = basePushEventSchema.extend({
    message: z
        .object({
            id: z.string(),
            text: z.string(),
            user: messageUserSchema,
        })
        .passthrough(),
    user: messageUserSchema.passthrough(),
    members: memberUserSchema.array(),
    channel_type: z.string(),
    channel_id: z.string(),
});

export type Type = z.infer<typeof schema>;
