import { PracticeProviderInvitationSchema } from '@/lib/shared/schema';
import * as z from 'zod';

export const schema = z.object({
    practiceId: PracticeProviderInvitationSchema.shape.practiceId,
    recipientEmail: PracticeProviderInvitationSchema.shape.recipientEmail,
    senderId: PracticeProviderInvitationSchema.shape.senderId,
    profileId: z.string().optional(),
    designation: PracticeProviderInvitationSchema.shape.designation,
    expiresInDays: z.number().optional(),
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
