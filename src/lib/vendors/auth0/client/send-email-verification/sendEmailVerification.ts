import { Input, Output } from './schema';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { getAccessToken } from '../get-access-token';
import { handleSendVerificationEmailError } from './errors';
import { auth0JobSchema } from '../../types';

export const sendEmailVerification = async ({
    userId,
}: Input): Promise<Output> => {
    const endpoint = getResourceEndpoint('EMAIL_VERIFICATION');
    const accessToken = await getAccessToken();
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: JSON.stringify({
            user_id: userId,
        }),
    });

    if (!response.ok) {
        const errorResult = await response.json();
        const error = new Error(
            errorResult.message ??
                `Failed to create email send job: ${response.statusText}`
        );
        handleSendVerificationEmailError(error, response);
    }
    const result = await response.json();
    const { status, id: jobId } = auth0JobSchema.parse(result);
    return {
        status,
        jobId,
    };
};
