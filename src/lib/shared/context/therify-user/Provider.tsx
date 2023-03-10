import { ReactNode, useEffect } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Context } from './Context';
import { trpc } from '@/lib/shared/utils/trpc';
import { GetUserDetailsById } from '@/lib/modules/users/features';

const USER_ROLES_COOKIE_KEY = 'userRoles' as const;

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
            `accounts.${GetUserDetailsById.TRPC_ROUTE}`,
            {
                userId: auth0User?.sub ?? '',
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

    useEffect(() => {
        if (therifyUser?.roles) {
            setCookie(
                null,
                USER_ROLES_COOKIE_KEY,
                therifyUser.roles.join(','),
                {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                }
            );
        }
    }, [therifyUser]);

    const clearCookies = () => {
        destroyCookie(null, USER_ROLES_COOKIE_KEY, {
            path: '/',
        });
    };
    return (
        <Context.Provider
            value={{
                user: therifyUser ?? null,
                isLoading: isLoadingTherifyUser || isLoadingAuth0User,
                isRefetching,
                errorMessage,
                refetch,
                clearCookies,
            }}
        >
            {children}
        </Context.Provider>
    );
};
