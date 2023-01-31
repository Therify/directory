import { trpc } from '@/lib/utils/trpc';

export const useProviderProfile = (userId?: string) => {
    const {
        data,
        error: queryError,
        isLoading,
        isRefetching,
        refetch,
    } = trpc.useQuery(
        [
            'accounts.users.get-provider-profile-by-user-id',
            {
                userId: userId ?? '',
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: !!userId,
        }
    );
    const [error] = data?.errors ?? [];
    const errorMessage: string | undefined = queryError?.message ?? error;

    return {
        profile: data?.profile ?? null,
        isLoading,
        isRefetching,
        refetch,
        errorMessage,
    };
};
