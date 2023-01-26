import { useRouter } from 'next/router';
import { H1, TopNavigationPage } from '@/components/ui';
import {
    MEMBER_MAIN_MENU,
    MEMBER_SECONDARY_MENU,
    MEMBER_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/context';
import { useContext } from 'react';

export default function MemberHomePage() {
    const { user, isLoading } = useContext(TherifyUser.Context);
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
            isLoadingUser={isLoading}
        >
            <H1>Member Home</H1>
        </TopNavigationPage>
    );
}
