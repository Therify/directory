import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    SettingsPage,
    SettingsPageUtils,
} from '@/lib/modules/accounts/components/settings';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { membersService } from '@/lib/modules/members/service';
import { MemberTherifyUserPageProps } from '@/lib/modules/members/service/get-therify-user-props';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getTherifyUserPageProps,
    })
);

export default function ClientDetailsPage({
    user,
}: MemberTherifyUserPageProps) {
    const { flags } = useFeatureFlags(user);
    const router = useRouter();
    const view = Array.isArray(router.query.view)
        ? router.query.view[0]
        : router.query.view;
    useEffect(() => {
        if (flags.didFlagsLoad && !flags.isV3DirectoryEnabled) {
            router.push(URL_PATHS.PROVIDERS.COACH.CLIENTS);
        }
    }, [flags.isV3DirectoryEnabled, flags.didFlagsLoad, router]);

    if (!user || !flags.isV3DirectoryEnabled) return null;
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.ACCOUNT.SETTINGS.ROOT}
            user={user}
        >
            <SettingsPage
                user={user}
                currentTab={SettingsPageUtils.getSettingsTabView(view)}
                onTabChange={(tabId) =>
                    router.push(
                        `${URL_PATHS.MEMBERS.ACCOUNT.SETTINGS.ROOT}/${tabId}`
                    )
                }
            />
        </MemberNavigationPage>
    );
}
