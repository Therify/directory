import { GetVerificationEmailStatus } from '@/lib/modules/registration/features';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ auth0 }: AccountsServiceParams) =>
    async ({
        jobId,
    }: GetVerificationEmailStatus.Input): Promise<{
        status: GetVerificationEmailStatus.Output['status'];
    }> => {
        const { status } = await auth0.getEmailStatus({
            jobId,
        });
        return {
            status,
        };
    };
