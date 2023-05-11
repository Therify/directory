import { SessionInvoiceSchema } from '@/lib/shared/schema';
import * as z from 'zod';

export const schema = z.object({
    memberId: z.string(),
    providerId: z.string(),
    status: SessionInvoiceSchema.shape.status.optional(),
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
