import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { PageContentContainer } from '@/components/ui';
import { SideNavigationPage } from '@/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';
import { RBAC } from '@/lib/utils';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { ProfileEditor } from '@/components/features/providers/ProfileEditor';
import { TherifyUser } from '@/lib/types';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);

export default function PracticeProfileCreatePage() {
    const { user, isLoading } = useTherifyUser();
    usePracticeAdminProtection(user);
    const router = useRouter();

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
            <ProfileEditor
                practice={{
                    id: '1',
                    name: 'Therify',
                    city: 'San Francisco',
                    state: 'CA',
                    website: 'https://therify.com',
                }}
                onSubmit={async (profile) => {
                    console.log('TODO: Create profile...', profile);
                }}
            />
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
