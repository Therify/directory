import { TherifyUser, useTherifyUser } from '@/lib/hooks';
import { createContext } from 'react';

interface TherifyUserContext {
    user?: TherifyUser;
    isLoading: boolean;
    errorMessage?: string;
    isRefetching: boolean;
    refetch?: ReturnType<typeof useTherifyUser>['refetch'];
}
export const Context = createContext<TherifyUserContext>({
    user: undefined,
    isLoading: false,
    errorMessage: undefined,
    isRefetching: false,
});
