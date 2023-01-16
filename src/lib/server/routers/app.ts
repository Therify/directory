import { createRouter } from '../createRouter';
import { accountsRouter } from './accounts';

export const appRouter = createRouter().merge('accounts.', accountsRouter);

export type AppRouter = typeof appRouter;
