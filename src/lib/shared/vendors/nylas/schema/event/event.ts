import z from 'zod';
import { Participant } from '../participant';
const whenSchema = z.object({
    startTime: z.number().optional(),
    endTime: z.number().optional(),
    startTimezone: z.string().optional(),
    endTimezone: z.string().optional(),
    time: z.number().optional(),
    timezone: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    date: z.string().optional(),
});
export const schema = z.object({
    id: z.string().optional(),
    calendarId: z.string(),
    when: whenSchema,
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    participants: Participant.schema.array().optional(),
});

export type Type = z.infer<typeof schema>;
