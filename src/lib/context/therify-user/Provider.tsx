import { ReactNode, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Context } from './Context';
import { trpc } from '@/lib/utils/trpc';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user: auth0User, isLoading: isLoadingAuth0User } = useUser();
    const {
        data: userData,
        error: queryError,
        isLoading: isLoadingTherifyUser,
        isRefetching,
        refetch,
    } = trpc.useQuery(
        [
            'accounts.users.get-user-details-by-auth0-id',
            {
                auth0Id: auth0User?.sub ?? '',
            },
        ],
        {
            // Should we refetch on an interval? (every 5-10 mins or so?)
            refetchOnWindowFocus: false,
            enabled: Boolean(auth0User?.sub),
        }
    );
    const { user: therifyUser } = userData ?? {};
    const [error] = userData?.errors ?? [];
    const errorMessage = (error ?? queryError?.message) as string | undefined;

    useEffect(() => {
        if (queryError) console.error(queryError);
        if (error) console.error(error);
    }, [queryError, error]);

    return (
        <Context.Provider
            value={{
                user: therifyUser ?? null,
                isLoading: isLoadingTherifyUser || isLoadingAuth0User,
                isRefetching,
                errorMessage,
                refetch,
            }}
        >
            {children}
        </Context.Provider>
    );
};