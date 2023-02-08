import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/types';
import { useRouter } from 'next/router';
import {
    SideNavigationPage,
    SideNavigationPageProps,
} from '../SideNavigationPage';

interface PracticeAdminNavigationPageProps
    extends Omit<
        SideNavigationPageProps,
        | 'primaryMenu'
        | 'secondaryMenu'
        | 'mobileMenu'
        | 'onNavigate'
        | 'isLoadingUser'
    > {
    user: TherifyUser.TherifyUser;
}

export function PracticeAdminNavigationPage(
    props: PracticeAdminNavigationPageProps
) {
    const router = useRouter();
    return (
        <SideNavigationPage
            primaryMenu={[...PRACTICE_ADMIN_MAIN_MENU]}
            secondaryMenu={[...PRACTICE_ADMIN_SECONDARY_MENU]}
            mobileMenu={[...PRACTICE_ADMIN_MOBILE_MENU]}
            onNavigate={router.push}
            isLoadingUser={false}
            {...props}
        />
    );
}
