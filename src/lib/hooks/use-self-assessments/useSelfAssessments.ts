import { trpc } from '@/lib/utils/trpc';

export const useSelfAssessments = (userId?: string) => {
    const {
        data,
        error: queryError,
        isLoading,
        isRefetching,
        refetch,
    } = trpc.useQuery(
        [
            'directory.members.get-self-assessments-by-user-id',
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
        selfAssessments: data?.selfAssessments ?? null,
        isLoading,
        isRefetching,
        refetch,
        errorMessage,
    };
};
