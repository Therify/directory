import { ConnectionRequestSchema } from '@/lib/shared/schema';
import * as z from 'zod';

export const schema = z.object({
    userId: z.string(),
    status: ConnectionRequestSchema.shape.connectionStatus
        .or(ConnectionRequestSchema.shape.connectionStatus.array())
        .optional(),
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
