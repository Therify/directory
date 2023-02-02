import { createRouter } from '../createRouter';
import { accountsRouter } from './accounts';
import { directoryRouter } from './directory';

export const appRouter = createRouter()
    .merge('accounts.', accountsRouter)
    .merge('directory.', directoryRouter);

export type AppRouter = typeof appRouter;
