import { GetConnectedCalendarEmails } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';

export const factory =
    ({ prisma }: SchedulingServiceParams) =>
    async ({
        userId,
    }: GetConnectedCalendarEmails.Input): Promise<{
        calendarEmails: GetConnectedCalendarEmails.Output['calendarEmails'];
    }> => {
        const calendarEmails = await prisma.calendarAccess.findMany({
            where: {
                userId,
            },
            select: {
                userId: true,
                emailAddress: true,
                isValid: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return { calendarEmails };
    };
