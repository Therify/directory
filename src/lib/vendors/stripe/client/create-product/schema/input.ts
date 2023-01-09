import * as z from 'zod';
import { stripeProductSchema } from '../../../types';

export const schema = stripeProductSchema
    .extend({
        name: z.string(),
    })
    .omit({
        object: true,
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
