import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/lib/shared/components/ui';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/shared/hooks';
import { RBAC } from '@/lib/shared/utils';

export const getServerSideProps = RBAC.requireTherapistAuth(
    withPageAuthRequired()
);

export default function TherapistDashboardPage() {
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...THERAPIST_MAIN_MENU]}
            secondaryMenu={[...THERAPIST_SECONDARY_MENU]}
            mobileMenu={[...THERAPIST_MOBILE_MENU]}
            isLoadingUser={isLoading}
        >
            <H1>Therapist Dashboard</H1>
        </SideNavigationPage>
    );
}
