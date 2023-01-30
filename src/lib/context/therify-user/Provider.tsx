import { ReactNode, useContext, useEffect } from 'react';
import { useTherifyUser } from '@/lib/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Context } from './Context';
import { FirebaseClient } from '../index';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user: auth0User, isLoading: isLoadingAuth0User } = useUser();
    const { firebase } = useContext(FirebaseClient.Context);
    const {
        user,
        isLoading: isLoadingTherifyUser,
        isRefetching,
        errorMessage,
        refetch,
    } = useTherifyUser(auth0User?.sub);
    const isLoading = isLoadingTherifyUser || isLoadingAuth0User;

    useEffect(() => {
        if (user?.firebaseToken && firebase?.isAuthenticated() === false) {
            firebase.authenticateWithCustomToken(user.firebaseToken);
        }
    }, [user, firebase]);

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
