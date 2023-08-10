import { RemoveCalendarAccess } from '@/lib/modules/scheduling/features';
import { SchedulingServiceParams } from '../params';

export const factory =
    ({ prisma }: SchedulingServiceParams) =>
    async ({
        emailAddress,
        userId,
    }: RemoveCalendarAccess.Input): Promise<{
        success: RemoveCalendarAccess.Output['success'];
    }> => {
        await prisma.calendarAccess.delete({
            where: {
                emailAddress,
                userId,
            },
        });
        return { success: true };
    };
