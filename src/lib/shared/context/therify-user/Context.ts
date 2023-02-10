import { GetUserDetailsById } from '@/lib/modules/users/features';
import { trpc } from '@/lib/shared/utils/trpc';
import { createContext } from 'react';

interface TherifyUserContext {
    user: GetUserDetailsById.Output['user'];
    isLoading: boolean;
    errorMessage?: string;
    isRefetching: boolean;
    clearCookies: () => void;
    refetch?: ReturnType<typeof trpc.useQuery>['refetch'];
}
export const Context = createContext<TherifyUserContext>({
    user: null,
    isLoading: false,
    errorMessage: undefined,
    isRefetching: false,
    clearCookies: () => {},
});
