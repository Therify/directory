import { useRouter } from 'next/router';
import { H1 } from '@/components/ui';
import { SideNavigationPage } from '@/components/features/pages';
import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';

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
