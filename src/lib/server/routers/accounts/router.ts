import * as trpc from '@trpc/server';
import { RegisterProvider } from '@/lib/features/registration';
import { registerProviderResolver } from './resolvers';
import { Context } from '../../context';

export const router = trpc
    .router<Context>()
    .mutation(RegisterProvider.TRPC_ROUTE, {
        input: RegisterProvider.inputSchema,
        output: RegisterProvider.outputSchema,
        resolve: registerProviderResolver,
    });
