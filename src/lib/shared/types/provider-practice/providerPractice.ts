import * as z from 'zod';
import { PracticeSchema } from '../../schema';

export const schema = PracticeSchema.pick({
    id: true,
    name: true,
    city: true,
    state: true,
    website: true,
    email: true,
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
