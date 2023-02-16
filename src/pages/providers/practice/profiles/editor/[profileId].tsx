import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { ProfileEditor } from '@/lib/modules/providers/components/ProfileEditor';
import { trpc } from '@/lib/shared/utils/trpc';
import { UpdateProviderProfile } from '@/lib/modules/providers/features/profiles';
import { ProvidersService } from '@/lib/modules/providers/service';
import { PracticeProfileEditorPageProps } from '@/lib/modules/providers/service/page-props/practice/get-practice-profile-editor-page-props';
import { useContext } from 'react';
import { Alerts } from '@/lib/modules/alerts/context';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.practice
                .getPracticeProfileEditorPageProps,
    })
);

export default function PracticeProfileCreatePage({
    user,
    profile,
    practice,
}: PracticeProfileEditorPageProps) {
    const router = useRouter();
    const { createAlert } = useContext(Alerts.Context);

    const {
        mutate: updateProfile,
        isLoading: isUpdatingProfile,
        error,
    } = trpc.useMutation(`providers.${UpdateProviderProfile.TRPC_ROUTE}`, {
        onSuccess: ({ success, errors }) => {
            if (success) {
                createAlert({
                    type: 'success',
                    title: 'Profile updated',
                });
                return;
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

    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.PRACTICE.PROFILES}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...PRACTICE_ADMIN_MAIN_MENU]}
            secondaryMenu={[...PRACTICE_ADMIN_SECONDARY_MENU]}
            mobileMenu={[...PRACTICE_ADMIN_MOBILE_MENU]}
        >
            <ProfileEditor
                providerProfile={profile}
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
        </SideNavigationPage>
    );
}
