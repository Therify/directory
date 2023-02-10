import { AxiosInstance } from 'axios';
import * as GetFormSubmissions from './schema/output';
import { TransposedSubmission } from '../../schema/submission';

/**
 * @description - Factory function to create a function that will get all form submissions
 * @param axios - Axios client
 * @returns
 */
export function factory(axios: AxiosInstance) {
    /**
     * @description - Get submissions by form id
     * @param formId - Form ID
     * @link https://api.jotform.com/docs/#form-id-submissions
     */
    return async function getFormSubmissions(formId: string, limit = 1_000) {
        const { data } = await axios.get(
            `/form/${formId}/submissions?limit=${limit}`
        );
        const response = GetFormSubmissions.validate(data);
        return {
            ...response,
            content: response.content.map(function (submission) {
                return {
                    ...submission,
                    answers: Object.values(submission.answers).reduce(
                        (answers, answer) => {
                            if (answer.name) {
                                if (answer.answer) {
                                    answers[answer.name] = answer.answer;
                                    return answers;
                                }
                            }
                            return answers;
                        },
                        {} as TransposedSubmission['answers']
                    ),
                };
            }),
        } as GetFormSubmissions.Output;
    };
}
