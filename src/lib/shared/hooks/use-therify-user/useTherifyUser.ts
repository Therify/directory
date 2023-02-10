import { useContext } from 'react';
import { GetUserDetailsById } from '@/lib/modules/users/features';
import { TherifyUser } from '@/lib/shared/context';

export const useTherifyUser = () => {
    const { user, isLoading, isRefetching, refetch, errorMessage } = useContext(
        TherifyUser.Context
    );
    return {
        user,
        isLoading,
        isRefetching,
        refetch,
        errorMessage,
    };
};

export type TherifyUser = GetUserDetailsById.Output['user'];
