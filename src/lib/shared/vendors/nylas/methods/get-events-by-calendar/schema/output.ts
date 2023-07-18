import * as z from 'zod';
import { Event } from '../../../schema';

export const schema = z.object({
    events: Event.schema.array(),
});

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
