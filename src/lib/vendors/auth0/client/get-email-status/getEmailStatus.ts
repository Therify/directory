import { getAccessToken } from '../get-access-token';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { Input, Output, responseSchema } from './schema';

export const getEmailStatus = async ({ jobId }: Input): Promise<Output> => {
    const endpoint = getResourceEndpoint('JOB_STATUS', jobId);
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
    });

    if (!response.ok) {
        console.info('response', response);
        const error = new Error(
            `Failed to create user: ${response.statusText}`
        );
        // handleCreateUserError(error, response);
    }
    const result = await response.json();
    const { status, time_left_seconds, percentage_done } =
        responseSchema.parse(result);
    return {
        status,
        timeLeftSeconds: time_left_seconds,
        percentageDone: percentage_done,
    };
};
