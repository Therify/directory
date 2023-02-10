import Stripe from 'stripe';
import * as z from 'zod';
import { StripeCustomer } from '../../../types';

export const schema = StripeCustomer.schema;

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
