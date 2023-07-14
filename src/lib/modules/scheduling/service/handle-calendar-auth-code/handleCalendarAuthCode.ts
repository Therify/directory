import { HandleCalendarAuthCode } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';

export const factory =
    ({ nylas, prisma }: SchedulingServiceParams) =>
    async ({
        code,
        userId,
    }: HandleCalendarAuthCode.Input): Promise<{
        success: HandleCalendarAuthCode.Output['success'];
    }> => {
        const { accessToken, emailAddress: rawEmailAddress } =
            await nylas.exchangeCodeForAccessToken({
                code,
            });
        const emailAddress = rawEmailAddress.toLowerCase().trim();
        const calendar = await prisma.calendarAccess.findFirst({
            where: {
                emailAddress,
                userId,
            },
        });
        if (calendar) {
            await prisma.calendarAccess.update({
                where: {
                    emailAddress,
                },
                data: {
                    accessToken,
                },
            });
        } else {
            await prisma.calendarAccess.create({
                data: {
                    userId,
                    emailAddress,
                    accessToken,
                },
            });
        }
        return { success: true };
    };
