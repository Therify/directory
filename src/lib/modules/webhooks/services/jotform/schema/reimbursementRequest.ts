import * as z from 'zod';
import { schema as baseFormSubmission } from './baseFormSubmission';

export const schema = baseFormSubmission.extend({
    therifydetails: z.string(),
    dateofsession: z.object({
        month: z.string(),
        day: z.string(),
        year: z.string(),
    }),
    clientemail: z.string(),
    providername: z.object({ first: z.string(), last: z.string() }),
    provideremail: z.string(),
    practice: z.string(),
});

export type ReimbursementRequest = z.infer<typeof schema>;
