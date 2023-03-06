import { ReactNode, useContext, useEffect } from 'react';
import { TherifyUser } from '..';
import { Context, firebase } from './Context';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(TherifyUser.Context);
    const isAuthenticated = firebase?.isAuthenticated();

    useEffect(() => {
        if (user?.firebaseToken && firebase?.isAuthenticated() === false) {
            firebase.authenticateWithCustomToken(user.firebaseToken);
        } else if (!user && firebase?.isAuthenticated()) {
            firebase.signOut();
        }
    }, [user, isAuthenticated]);

    return (
        <Context.Provider
            value={{
                firebase,
            }}
        >
            {children}
        </Context.Provider>
    );
};
