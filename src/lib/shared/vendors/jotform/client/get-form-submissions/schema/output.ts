import * as z from 'zod';
import * as Answer from '../../../schema/answer';
import { responseContentsFactory } from '../../../schema/apiResponse';

/* instanbul ignore next */
const submissionSchema = z.object({
    id: z.string(),
    form_id: z.string(),
    ip: z.string(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    status: z.string(),
    new: z.string(),
    answers: z.record(z.string(), Answer.schema),
});

/* instanbul ignore next */
export const { schema, validate, isValid } = responseContentsFactory(
    z.array(submissionSchema)
);

export type Output = z.TypeOf<typeof schema>;
