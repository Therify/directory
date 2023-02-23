import { ConnectionRequest } from '@/lib/shared/types';
import * as z from 'zod';

export const schema = z.object({
    connectionStatus: ConnectionRequest.schema.shape.connectionStatus,
    profileId: z.string(),
    memberId: z.string(),
    userId: z.string(),
    declineMessage: z.string().optional(),
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
