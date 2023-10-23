import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alerts } from '@/lib/modules/alerts/context';
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

// TODO: Remove mock data
const mockDependents = [
    {
        id: '1',
        givenName: 'John',
        surname: 'Doe',
        emailAddress: 'test@therify.co',
    },
    {
        id: '2',
        givenName: 'Jane',
        surname: 'Doe',
        emailAddress: 'test2@therify.co',
    },
];

export default function MemberSettingsPage({
    user,
}: MemberTherifyUserPageProps) {
    const { createAlert } = useContext(Alerts.Context);
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
    const handleRemoveDependent = (dependentId: string) => {
        console.log({ dependentId });
    };
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
                onImageUploadError={(error) =>
                    createAlert({
                        title: error instanceof Error ? error.message : error,
                        type: 'success',
                    })
                }
                onImageUploadSuccess={(error) => {
                    if (error) {
                        createAlert({
                            title: error.message,
                            type: 'error',
                        });
                        return;
                    }
                    createAlert({
                        title: 'Account details updated',
                        type: 'success',
                    });
                }}
                onUpdateUserDetails={(details, reset) => {
                    // TODO: Update with TRPC mutation
                    console.log({ details });
                    reset(
                        {
                            ...details,
                        },
                        {
                            keepIsValid: false,
                            keepDirty: false,
                            keepTouched: false,
                        }
                    );
                }}
                dependents={mockDependents}
                onRemoveDependent={handleRemoveDependent}
                onCreateShareableLink={console.log}
                onUpdateInsuranceDetails={console.log}
                dependentInvitationLink={undefined}
                launchStripePortal={() => console.log('launch stripe portal')}
                onUpdateNotifications={(details, reset) => {
                    // TODO: Update with TRPC mutation
                    console.log({ details });
                    reset(
                        {
                            ...details,
                        },
                        {
                            keepIsValid: false,
                            keepDirty: false,
                            keepTouched: false,
                        }
                    );
                }}
            />
        </MemberNavigationPage>
    );
}
