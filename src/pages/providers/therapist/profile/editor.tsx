import { useContext } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { ProfileEditor } from '@/lib/modules/providers/components/ProfileEditor';
import { trpc } from '@/lib/shared/utils/trpc';
import {
    GetProviderProfileByUserId,
    UpdateProviderProfile,
} from '@/lib/modules/providers/features/profiles';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderProfileEditorPageProps } from '@/lib/modules/providers/service/page-props/get-provider-profile-editor-page-props';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { LoadingContainer } from '@/lib/shared/components/ui';
import { Alerts } from '@/lib/modules/alerts/context';

export const getServerSideProps = RBAC.requireTherapistAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getProviderProfileEditorPageProps,
    })
);

export default function TherapistProfileEditorPage({
    user,
    profile,
    practice,
}: ProviderProfileEditorPageProps) {
    const router = useRouter();
    const { createAlert } = useContext(Alerts.Context);

    const { mutate: updateProfile, isLoading: isUpdatingProfile } =
        trpc.useMutation(`providers.${UpdateProviderProfile.TRPC_ROUTE}`, {
            onSuccess: ({ success, errors }) => {
                if (success) {
                    createAlert({
                        type: 'success',
                        title: 'Profile updated',
                    });
                    return refetch();
                }
                const [error] = errors;
                if (error) {
                    console.error(error);
                    createAlert({
                        type: 'error',
                        title: error,
                    });
                }
            },
        });

    const {
        data: refetchedData,
        isLoading,
        refetch,
        isRefetching,
    } = trpc.useQuery(
        [
            `providers.${GetProviderProfileByUserId.TRPC_ROUTE}`,
            {
                userId: user?.userId,
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: !!user?.userId,
        }
    );
    const { profile: refetchedProfile } = refetchedData ?? {};

    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.PROFILE_EDITOR}
            user={user}
        >
            <LoadingContainer isLoading={isLoading || isRefetching}>
                <ProfileEditor
                    onBack={router.back}
                    canEditSessionPrice
                    providerProfile={refetchedProfile ?? profile}
                    practice={practice}
                    isSavingProfile={isUpdatingProfile}
                    onSubmit={async (profile) => {
                        if (!user?.userId)
                            return console.error('User is not logged in');
                        return updateProfile({
                            userId: user.userId,
                            profile,
                        });
                    }}
                />
            </LoadingContainer>
        </ProviderNavigationPage>
    );
}
