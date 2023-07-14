import { GetConnectedCalendarEmails } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';

export const factory =
    ({ nylas, prisma }: SchedulingServiceParams) =>
    async ({
        userId,
    }: GetConnectedCalendarEmails.Input): Promise<{
        calendarEmails: GetConnectedCalendarEmails.Output['calendarEmails'];
    }> => {
        const calendarEmails = await prisma.calendarAccess.findMany({
            where: {
                userId,
            },
        });

        return { calendarEmails };
    };
