import { useRouter } from 'next/router';
import { H1, SideNavigationPage } from '@/components/ui';
import {
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useContext } from 'react';
import { TherifyUser } from '@/lib/context';

export default function TherapistDashboardPage() {
    const { user, isLoading } = useContext(TherifyUser.Context);
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
            isLoadingUser={isLoading}
        >
            <H1>Coach Dashboard</H1>
        </SideNavigationPage>
    );
}
