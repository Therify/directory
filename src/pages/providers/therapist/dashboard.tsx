import { useRouter } from 'next/router';
import { H1, SideNavigationPage } from '@/components/ui';
import { useTherifyUser } from '@/lib/hooks';
import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function TherapistDashboardPage() {
    const { user: auth0User } = useUser();
    const { user } = useTherifyUser(auth0User?.sub);
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD}
            onNavigate={router.push}
            user={user}
            onShowNotifications={() => console.log('Show notifications...')}
            primaryMenu={[...THERAPIST_MAIN_MENU]}
            secondaryMenu={[...THERAPIST_SECONDARY_MENU]}
            mobileMenu={[...THERAPIST_MOBILE_MENU]}
            notificationCount={0}
            notificationPaths={{}}
        >
            <H1>Therapist Dashboard</H1>
        </SideNavigationPage>
    );
}
