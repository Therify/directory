import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/components/ui';
import {
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { SideNavigationPage } from '@/components/features/pages';
import { useTherifyUser } from '@/lib/hooks';
import { RBAC } from '@/lib/utils';

export const getServerSideProps = RBAC.requireCoachAuth(withPageAuthRequired());

export default function TherapistDashboardPage() {
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.DASHBOARD}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...COACH_MAIN_MENU]}
            secondaryMenu={[...COACH_SECONDARY_MENU]}
            mobileMenu={[...COACH_MOBILE_MENU]}
            isLoadingUser={isLoading}
        >
            <H1>Coach Dashboard</H1>
        </SideNavigationPage>
    );
}
