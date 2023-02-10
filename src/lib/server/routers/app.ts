import { createRouter } from '../createRouter';
import { accountsRouter } from '@/lib/modules/accounts/routes';
import { memberRouter } from '@/lib/modules/members/routes';

export const appRouter = createRouter()
    .merge('accounts.', accountsRouter)
    .merge('members.', memberRouter);

export type AppRouter = typeof appRouter;
