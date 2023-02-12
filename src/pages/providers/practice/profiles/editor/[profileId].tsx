import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/shared/hooks';
import { RBAC } from '@/lib/shared/utils';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { ProfileEditor } from '@/lib/modules/providers/components/ProfileEditor';
import { TherifyUser } from '@/lib/shared/types';
import { trpc } from '@/lib/shared/utils/trpc';
import { LoadingContainer } from '@/lib/shared/components/ui';
import {
    GetProviderProfileById,
    UpdateProviderProfile,
} from '@/lib/modules/providers/features/profiles';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);

export default function PracticeProfileCreatePage() {
    const { user, isLoading } = useTherifyUser();
    usePracticeAdminProtection(user);
    const router = useRouter();
    const { profileId } = router.query as { profileId: string };

    const {
        data,
        isLoading: isLoadingProfile,
        error: profileError,
    } = trpc.useQuery(
        [`providers.${GetProviderProfileById.TRPC_ROUTE}`, { profileId }],
        {
            enabled: !!profileId,
            refetchOnWindowFocus: false,
        }
    );

    const profile = data?.profile;
    useEffect(() => {
        if (profile === null) {
            router.push(URL_PATHS[404]);
        }
    }, [profile, router]);

    const {
        mutate: updateProfile,
        isLoading: isUpdatingProfile,
        error,
    } = trpc.useMutation(`providers.${UpdateProviderProfile.TRPC_ROUTE}`);

    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.PRACTICE.PROFILES}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...PRACTICE_ADMIN_MAIN_MENU]}
            secondaryMenu={[...PRACTICE_ADMIN_SECONDARY_MENU]}
            mobileMenu={[...PRACTICE_ADMIN_MOBILE_MENU]}
            isLoadingUser={isLoading}
        >
            <LoadingContainer
                isLoading={isLoading || isLoadingProfile || !profile}
            >
                {profile && (
                    <ProfileEditor
                        //  TODO: Get practice from query
                        providerProfile={profile}
                        practice={{
                            id: '1',
                            name: 'Therify',
                            city: 'San Francisco',
                            state: 'CA',
                            website: 'https://therify.co',
                        }}
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
                )}
            </LoadingContainer>
        </SideNavigationPage>
    );
}

// TODO: Move to server side
const usePracticeAdminProtection = (user: TherifyUser.TherifyUser | null) => {
    const router = useRouter();
    useEffect(() => {
        if (user?.isPracticeAdmin === false) {
            const isTherapist = user.roles.includes(Role.provider_therapist);
            isTherapist
                ? router.push(URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD)
                : router.push(URL_PATHS.PROVIDERS.COACH.DASHBOARD);
        }
    }, [router, user?.isPracticeAdmin, user?.roles]);
};
