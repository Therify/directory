import { appRouter } from '@/lib/server/routers/app';
import { createContext } from '@/lib/server/context';
import * as trpcNext from '@trpc/server/adapters/next';

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
});
