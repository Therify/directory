import * as trpc from '@trpc/server';
import {
    generateCalendarAuthUrlResolver,
    handleCalendarAuthCodeResolver,
    getConnectedCalendarEmailsResolver,
    removeCalendarAccessResolver,
    getAvailableTimeSlotsResolver,
} from './resolvers';
import { Context } from '../../../server/context';
import {
    GenerateCalendarAuthUrl,
    GetConnectedCalendarEmails,
    HandleCalendarAuthCode,
    RemoveCalendarAccess,
    GetAvailableTimeSlots,
} from '@/lib/modules/scheduling/features';

export const router = trpc
    .router<Context>()
    .query(GetConnectedCalendarEmails.TRPC_ROUTE, {
        input: GetConnectedCalendarEmails.inputSchema,
        output: GetConnectedCalendarEmails.outputSchema,
        resolve: getConnectedCalendarEmailsResolver,
    })
    .query(GetAvailableTimeSlots.TRPC_ROUTE, {
        input: GetAvailableTimeSlots.inputSchema,
        output: GetAvailableTimeSlots.outputSchema,
        resolve: getAvailableTimeSlotsResolver,
    })
    .mutation(GenerateCalendarAuthUrl.TRPC_ROUTE, {
        input: GenerateCalendarAuthUrl.inputSchema,
        output: GenerateCalendarAuthUrl.outputSchema,
        resolve: generateCalendarAuthUrlResolver,
    })
    .mutation(HandleCalendarAuthCode.TRPC_ROUTE, {
        input: HandleCalendarAuthCode.inputSchema,
        output: HandleCalendarAuthCode.outputSchema,
        resolve: handleCalendarAuthCodeResolver,
    })
    .mutation(RemoveCalendarAccess.TRPC_ROUTE, {
        input: RemoveCalendarAccess.inputSchema,
        output: RemoveCalendarAccess.outputSchema,
        resolve: removeCalendarAccessResolver,
    });
