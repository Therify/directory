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
import { useEffect, useState } from 'react';
import { Role } from '@prisma/client';
import { ProfileEditor } from '@/lib/modules/providers/components/ProfileEditor';
import { TherifyUser } from '@/lib/shared/types';
import { trpc } from '@/lib/shared/utils/trpc';
import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';
import { ProvidersService } from '@/lib/modules/providers/service';
import { PracticeCreateProfilePageProps } from '@/lib/modules/providers/service/page-props/practice/get-practice-create-profile-page-props';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.practice
                .getPracticeCreateProfilePageProps,
    })
);

export default function PracticeProfileCreatePage({
    user,
    practice,
}: PracticeCreateProfilePageProps) {
    const router = useRouter();

    const {
        mutate: createProfileForPractice,
        isLoading: isCreatingProfile,
        error,
    } = trpc.useMutation(
        `providers.${CreateProviderProfileForPractice.TRPC_ROUTE}`,
        {
            onSuccess: ({ profileId, errors }) => {
                if (profileId) {
                    router.push(
                        `${URL_PATHS.PROVIDERS.PRACTICE.PROFILE_EDITOR}/${profileId}`
                    );
                }
                const [error] = errors;
            },
        }
    );

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
                practice={practice}
                isSavingProfile={isCreatingProfile}
                onSubmit={async (profile) => {
                    if (!user?.userId)
                        return console.error('User is not logged in');
                    if (!profile.practiceStartDate)
                        return console.error(
                            'practiceStartDate is not defined'
                        );

                    return createProfileForPractice({
                        userId: user.userId,
                        profile: profile,
                    });
                }}
            />
        </SideNavigationPage>
    );
}
