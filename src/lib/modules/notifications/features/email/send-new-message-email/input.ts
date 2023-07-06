import * as z from 'zod';
import { KnockRecipient } from '@/lib/shared/vendors/knock';

export const schema = z.object({
    messageUrl: z.string().url(),
    sender: z.object({
        name: z.string(),
        id: z.string(),
    }),
    recipients: KnockRecipient.schema.array(),
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
