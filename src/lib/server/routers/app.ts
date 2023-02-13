import { createRouter } from '../createRouter';
import { accountsRouter } from '@/lib/modules/accounts/routes';
import { memberRouter } from '@/lib/modules/members/routes';
import { providerRouter } from '@/lib/modules/providers/routes';

export const appRouter = createRouter()
    .merge('accounts.', accountsRouter)
    .merge('members.', memberRouter)
    .merge('providers.', providerRouter);

export type AppRouter = typeof appRouter;
