import { useContext } from 'react';
import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { TherifyUser } from '@/lib/context';

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

export type TherifyUser = GetUserDetailsByAuth0Id.Output['user'];
