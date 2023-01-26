import { ReactNode } from 'react';
import { useTherifyUser } from '@/lib/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Context } from './Context';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user: auth0User, isLoading: isLoadingAuth0User } = useUser();
    const {
        user,
        isLoading: isLoadingTherifyUser,
        isRefetching,
        errorMessage,
        refetch,
    } = useTherifyUser(auth0User?.sub);
    const isLoading = isLoadingTherifyUser || isLoadingAuth0User;

    return (
        <Context.Provider
            value={{
                user,
                isLoading,
                isRefetching,
                errorMessage,
                refetch,
            }}
        >
            {children}
        </Context.Provider>
    );
};
