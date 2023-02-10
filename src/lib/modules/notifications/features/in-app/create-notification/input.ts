import * as z from 'zod';
import { Notification } from '@/lib/shared/types';

export const schema = z.object({
    targetUserId: z.string(),
    notification: z.object({
        title: Notification.InApp.schema.shape.title,
        body: Notification.InApp.schema.shape.body,
        imageUrl: Notification.InApp.schema.shape.imageUrl,
        action: Notification.InApp.schema.shape.action,
    }),
});

export type Input = z.infer<typeof schema>;

export const validate = (value: unknown): Input => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Input => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
