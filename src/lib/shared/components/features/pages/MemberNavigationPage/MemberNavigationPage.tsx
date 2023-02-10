import {
    MEMBER_MAIN_MENU,
    MEMBER_MOBILE_MENU,
    MEMBER_SECONDARY_MENU,
} from '@/lib/sitemap/menus/member-menu';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { TherifyUser } from '@/lib/shared/types';
import { useRouter } from 'next/router';
import {
    TopNavigationPage,
    TopNavigationPageProps,
} from '../TopNavigationPage';

export interface MemberNavigationPageProps
    extends Omit<
        TopNavigationPageProps,
        | 'primaryMenu'
        | 'secondaryMenu'
        | 'mobileMenu'
        | 'onNavigate'
        | 'isLoadingUser'
    > {
    user: TherifyUser.TherifyUser;
}

export function MemberNavigationPage(props: MemberNavigationPageProps) {
    const router = useRouter();
    return (
        <TopNavigationPage
            {...props}
            onNavigate={router.push}
            primaryMenu={[...MEMBER_MAIN_MENU]}
            secondaryMenu={[...MEMBER_SECONDARY_MENU]}
            mobileMenu={[...MEMBER_MOBILE_MENU]}
            isLoadingUser={false}
        />
    );
}
