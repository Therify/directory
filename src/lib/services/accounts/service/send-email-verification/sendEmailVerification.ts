import { SendEmailVerification } from '@/lib/features/registration';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ auth0 }: AccountsServiceParams) =>
    async ({
        auth0UserId,
    }: SendEmailVerification.Input): Promise<{
        status: SendEmailVerification.Output['status'];
        jobId: SendEmailVerification.Output['jobId'];
    }> => {
        const { jobId, status } = await auth0.sendEmailVerification({
            userId: auth0UserId,
        });
        return {
            jobId,
            status,
        };
    };
