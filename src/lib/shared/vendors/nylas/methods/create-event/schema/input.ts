import * as z from 'zod';
import { Participant } from '../../../schema';

export const schema = z.object({
    accessToken: z.string(),
    calendarId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    startTimestamp: z.number(),
    endTimestamp: z.number(),
    participants: Participant.schema.array(),
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
