import { createRouter } from '../createRouter';
import { accountsRouter } from './accounts';
import { memberRouter } from './members';

export const appRouter = createRouter()
    .merge('accounts.', accountsRouter)
    .merge('members.', memberRouter);

export type AppRouter = typeof appRouter;
