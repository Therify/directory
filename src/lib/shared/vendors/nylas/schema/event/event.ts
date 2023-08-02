import z from 'zod';
import { Participant } from '../participant';
import { endOfDay, startOfDay } from 'date-fns';
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
    when: whenSchema.transform(whenTransformer),
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    participants: Participant.schema.array().optional(),
});

export type Type = z.infer<typeof schema>;

function whenTransformer({
    startTime,
    endTime,
    startTimezone,
    endTimezone,
    time,
    timezone,
    startDate,
    endDate,
    date,
}: z.infer<typeof whenSchema>): {
    startTime: number;
    endTime: number;
} {
    if (startTime && endTime) {
        return {
            startTime: new Date(startTime * 1000).getTime(),
            endTime: new Date(endTime * 1000).getTime(),
        };
    }
    if (startDate && endDate) {
        return {
            startTime: new Date(startDate).getTime(),
            endTime: new Date(endDate).getTime(),
        };
    }
    if (date) {
        const day = new Date(date);
        return {
            startTime: startOfDay(day).getTime(),
            endTime: endOfDay(day).getTime(),
        };
    }
    if (time) {
        return {
            startTime: new Date(time * 1000).getTime(),
            endTime: new Date(time * 1000).getTime(),
        };
    }
    return {
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
    };
}
