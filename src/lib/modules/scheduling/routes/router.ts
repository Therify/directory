import * as trpc from '@trpc/server';
import {
    generateCalendarAuthUrlResolver,
    handleCalendarAuthCodeResolver,
    getConnectedCalendarEmailsResolver,
} from './resolvers';
import { Context } from '../../../server/context';
import {
    GenerateCalendarAuthUrl,
    GetConnectedCalendarEmails,
    HandleCalendarAuthCode,
} from '@/lib/modules/scheduling/features';

export const router = trpc
    .router<Context>()
    .query(GetConnectedCalendarEmails.TRPC_ROUTE, {
        input: GetConnectedCalendarEmails.inputSchema,
        output: GetConnectedCalendarEmails.outputSchema,
        resolve: getConnectedCalendarEmailsResolver,
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
    });
