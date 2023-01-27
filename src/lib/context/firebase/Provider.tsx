import { ReactNode } from 'react';
import { Context, firebase } from './Context';

export const Provider = ({ children }: { children: ReactNode }) => (
    <Context.Provider
        value={{
            firebase,
        }}
    >
        {children}
    </Context.Provider>
);
