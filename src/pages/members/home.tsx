import { useRouter } from 'next/router';
import { H1, TopNavigationPage } from '@/components/ui';
import { useTherifyUser } from '@/lib/hooks';
import {
    MEMBER_MAIN_MENU,
    MEMBER_SECONDARY_MENU,
    MEMBER_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function MemberHomePage() {
    const { user: auth0User, isLoading: isLoadingAuth0User } = useUser();
    const { user, isLoading: isLoadingTherifyUser } = useTherifyUser(
        auth0User?.sub
    );
    const router = useRouter();
    return (
        <TopNavigationPage
            currentPath={URL_PATHS.MEMBERS.HOME}
            onNavigate={router.push}
            user={user}
            onShowNotifications={() => console.log('Show notifications...')}
            primaryMenu={[...MEMBER_MAIN_MENU]}
            secondaryMenu={[...MEMBER_SECONDARY_MENU]}
            mobileMenu={[...MEMBER_MOBILE_MENU]}
            notificationCount={0}
            notificationPaths={{}}
            isLoadingUser={isLoadingAuth0User || isLoadingTherifyUser}
        >
            <H1>Member Home</H1>
        </TopNavigationPage>
    );
}
