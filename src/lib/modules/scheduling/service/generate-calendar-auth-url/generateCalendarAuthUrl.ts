import { GenerateCalendarAuthUrl } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';

export const factory =
    ({ nylas }: SchedulingServiceParams) =>
    async ({
        emailAddress,
        successUrl,
    }: GenerateCalendarAuthUrl.Input): Promise<{
        authUrl: GenerateCalendarAuthUrl.Output['authUrl'];
    }> => {
        const { authUrl } = await nylas.generateAuthUrl({
            emailAddress: emailAddress.toLowerCase().trim(),
            successUrl,
        });
        return {
            authUrl,
        };
    };
