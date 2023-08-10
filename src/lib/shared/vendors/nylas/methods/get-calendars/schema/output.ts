import * as z from 'zod';
import { Calendar } from '../../../schema';

export const schema = z.object({
    calendars: Calendar.schema.array(),
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
