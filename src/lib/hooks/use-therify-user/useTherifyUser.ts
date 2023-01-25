import { useEffect } from 'react';
import { trpc } from '@/lib/utils/trpc';
import { Output } from './schema';

interface QueryOptions {
    refetchOnWindowFocus?: boolean;
    refetchInterval?: number;
}

export const useTherifyUser = (
    auth0Id: string | null | undefined,
    queryOptions?: QueryOptions
): Output => {
    const {
        data: userData,
        error: queryError,
        isLoading,
        isRefetching,
    } = trpc.useQuery(
        [
            'accounts.users.get-user-details-by-auth0-id',
            {
                auth0Id: auth0Id ?? '',
            },
        ],
        {
            ...queryOptions,
            refetchOnWindowFocus: Boolean(queryOptions?.refetchOnWindowFocus),
            enabled: Boolean(auth0Id),
        }
    );
    const [error] = userData?.errors ?? [];

    useEffect(() => {
        if (queryError) console.error(queryError);
        if (error) console.error(error);
    }, [queryError, error]);

    return {
        isLoading,
        isRefetching,
        errorMessage: (error ?? queryError?.message) as string | undefined,
        user: userData?.details?.user
            ? {
                  ...userData?.details?.user,
                  plan: userData?.details?.plan,
              }
            : undefined,
    };
};

export type TherifyUser = ReturnType<typeof useTherifyUser>['user'];
