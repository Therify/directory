import { ReactNode, useContext, useEffect } from 'react';
import { TherifyUser } from '..';
import { Context, firebase } from './Context';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(TherifyUser.Context);

    useEffect(() => {
        if (user?.firebaseToken && firebase?.isAuthenticated() === false) {
            // TODO: There is a case where user can be defined but firebaseToken is undefined
            // This will cause the user to never authenticate with firebase
            firebase.authenticateWithCustomToken(user.firebaseToken);
        } else if (!user && firebase?.isAuthenticated()) {
            firebase.signOut();
        }
    }, [user]);

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
