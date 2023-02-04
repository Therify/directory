import * as z from 'zod';
import { ZodSchema } from 'zod';
import { RAW_SUBMISSION_SCHEMA } from './submission';

export const schema = z.object({
    ...RAW_SUBMISSION_SCHEMA,
    answers: z.unknown(),
});

export type ParsedSubmission = z.infer<typeof schema>;
export type ParsedSubmissionAnswer<T = unknown> = Omit<
    ParsedSubmission,
    'answers'
> & {
    answers: T;
};

export const validate = (value: unknown): ParsedSubmission => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ParsedSubmission => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
export function parsedSubmissionFactory<S extends ZodSchema>(answersSchema: S) {
    const parsedSubmissionSchema = z.object({
        ...RAW_SUBMISSION_SCHEMA,
        answers: answersSchema,
    });
    type ParsedAnswerSchema = z.infer<typeof parsedSubmissionSchema>;
    const validate = (value: unknown): ParsedAnswerSchema =>
        parsedSubmissionSchema.parse(value);
    const isValid = (value: unknown): value is ParsedAnswerSchema => {
        try {
            validate(value);
            return true;
        } catch {
            /* istanbul ignore next */
            return false;
        }
    };
    return {
        schema: parsedSubmissionSchema,
        validate,
        isValid,
    };
}
