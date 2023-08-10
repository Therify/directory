import { prisma } from '@/lib/prisma';
import { SchedulingServiceParams } from './params';
import { vendorNylas } from '@/lib/shared/vendors/nylas';
import { HandleCalendarAuthCode } from './handle-calendar-auth-code';
import { GenerateCalendarAuthUrl } from './generate-calendar-auth-url';
import { GetConnectedCalendarEmails } from './get-connected-calendar-emails';
import { RemoveCalendarAccess } from './remove-calendar-access';
import { GetAvailableTimeSlots } from './get-available-time-slots';

const factoryParams: SchedulingServiceParams = {
    prisma,
    nylas: vendorNylas,
};
export const SchedulingService = {
    generateCalendarAuthUrl: GenerateCalendarAuthUrl.factory(factoryParams),
    handleCalendarAuthCode: HandleCalendarAuthCode.factory(factoryParams),
    getConnectedCalendarEmails:
        GetConnectedCalendarEmails.factory(factoryParams),
    removeCalendarAccess: RemoveCalendarAccess.factory(factoryParams),
    getAvailableTimeSlots: GetAvailableTimeSlots.factory(factoryParams),
};

export type SchedulingService = typeof SchedulingService;
