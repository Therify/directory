import { ListSelfAssessmentsByUserId } from '@/lib/modules/members/features';
import { trpc } from '@/lib/shared/utils/trpc';

export const useSelfAssessments = (
    userId: string | undefined,
    options?: ListSelfAssessmentsByUserId.Input['options']
) => {
    const {
        data,
        error: queryError,
        isLoading,
        isRefetching,
        refetch,
    } = trpc.useQuery(
        [
            'members.list-self-assessments-by-user-id',
            {
                userId: userId ?? '',
                options,
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
        mostRecentSelfAssessment: data?.selfAssessments?.[0] ?? null,
        isLoading,
        isRefetching,
        refetch,
        errorMessage,
    };
};
