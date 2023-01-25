import { useRouter } from 'next/router';
import { H1, SideNavigationPage } from '@/components/ui';
import { useTherifyUser } from '@/lib/hooks';
import {
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function TherapistDashboardPage() {
    const { user: auth0User } = useUser();
    const { user } = useTherifyUser(auth0User?.sub);
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.DASHBOARD}
            onNavigate={router.push}
            user={user}
            onShowNotifications={() => console.log('Show notifications...')}
            primaryMenu={[...COACH_MAIN_MENU]}
            secondaryMenu={[...COACH_SECONDARY_MENU]}
            mobileMenu={[...COACH_MOBILE_MENU]}
            notificationCount={0}
            notificationPaths={{}}
        >
            <H1>Therapist Dashboard</H1>
        </SideNavigationPage>
    );
}
