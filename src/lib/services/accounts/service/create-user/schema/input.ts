import { UserSchema } from '@/lib/schema';
import * as z from 'zod';

export const schema = UserSchema.omit({
    createdAt: true,
    updatedAt: true,
})
    .extend({
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        acceptTermsAndConditions: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
    })
    .refine((data) => data.acceptTermsAndConditions, {
        message: 'You must accept the terms and conditions',
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
