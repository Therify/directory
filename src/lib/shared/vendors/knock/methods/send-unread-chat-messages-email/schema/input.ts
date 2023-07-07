import * as z from 'zod';
import { KnockRecipient, KnockActor } from '../../../schema';

export const schema = z.object({
    recipients: KnockRecipient.schema.array(),
    messageUrl: z.string().url(),
    actor: KnockActor.schema.optional(),
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
