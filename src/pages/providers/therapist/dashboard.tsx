import { useContext } from 'react';
import { useRouter } from 'next/router';
import { H1, SideNavigationPage } from '@/components/ui';
import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/context';

export default function TherapistDashboardPage() {
    const { user, isLoading } = useContext(TherifyUser.Context);
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
            isLoadingUser={isLoading}
        >
            <H1>Therapist Dashboard</H1>
        </SideNavigationPage>
    );
}
