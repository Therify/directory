import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { trpc } from '@/lib/utils/trpc';
import { createContext } from 'react';

interface TherifyUserContext {
    user: GetUserDetailsByAuth0Id.Output['user'];
    isLoading: boolean;
    errorMessage?: string;
    isRefetching: boolean;
    refetch?: ReturnType<typeof trpc.useQuery>['refetch'];
}
export const Context = createContext<TherifyUserContext>({
    user: null,
    isLoading: false,
    errorMessage: undefined,
    isRefetching: false,
});
