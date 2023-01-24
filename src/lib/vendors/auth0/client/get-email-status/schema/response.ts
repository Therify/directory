import * as z from 'zod';

export const schema = z.object({
    status: z.string(),
    type: z.string(),
    created_at: z.string(),
    id: z.string(),
    connection_id: z.string().optional(),
    location: z.string().optional(),
    percentage_done: z.number().optional(),
    time_left_seconds: z.number().optional(),
    format: z.string().optional(),
});
