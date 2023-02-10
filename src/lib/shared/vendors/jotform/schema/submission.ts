import * as z from 'zod';
import * as Answer from './answer';

export const RAW_SUBMISSION_SCHEMA = {
    id: z.string(),
    form_id: z.string(),
    ip: z.string(),
    status: z.string(),
    answers: z.record(z.string(), Answer.schema),
    created_at: z.string(),
    updated_at: z.string().nullable(),
};

export const schema = z.object({
    id: z.string(),
    form_id: z.string(),
    ip: z.string(),
    status: z.string(),
    answers: z.record(z.string(), Answer.schema),
    created_at: z.string(),
    updated_at: z.string().nullable(),
});

export type Submission = z.infer<typeof schema>;
export type TransposedSubmission = Submission & {
    answers: { [key: string]: Answer.Answer['answer'] };
};

export const validate = (value: unknown): Submission => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Submission => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
