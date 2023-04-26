import * as z from 'zod';
import { SessionInvoiceSchema, UserSchema } from '@/lib/shared/schema';

export const schema = z.object({
    invoices: SessionInvoiceSchema.extend({
        member: UserSchema.pick({
            id: true,
            givenName: true,
            surname: true,
            emailAddress: true,
        }),
    }).array(),
    errors: z.array(z.string()),
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
