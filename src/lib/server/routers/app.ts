import { createRouter } from '../createRouter';
import { accountsRouter } from '@/lib/modules/accounts/routes';
import { memberRouter } from '@/lib/modules/members/routes';
import { providerRouter } from '@/lib/modules/providers/routes';
import { directoryRouter } from '@/lib/modules/directory/routes';
import { schedulingRouter } from '@/lib/modules/scheduling/routes';

export const appRouter = createRouter()
    .merge('accounts.', accountsRouter)
    .merge('members.', memberRouter)
    .merge('providers.', providerRouter)
    .merge('directory.', directoryRouter)
    .merge('scheduling.', schedulingRouter);

export type AppRouter = typeof appRouter;
