import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    NavigationLink,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { useRouter } from 'next/router';
import {
    SideNavigationPage,
    SideNavigationPageProps,
} from '../SideNavigationPage';
import { Role } from '@prisma/client';
import { CHAT } from '@/lib/sitemap/menus/coach-menu/links';

interface ProviderNavigationPageProps
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

export function ProviderNavigationPage(props: ProviderNavigationPageProps) {
    const router = useRouter();
    const { primaryMenu, secondaryMenu, mobileMenu } = getMenusByRole(
        props.user?.roles ?? [],
        props.user?.hasChatEnabled ?? false
    );
    return (
        <SideNavigationPage
            primaryMenu={primaryMenu}
            secondaryMenu={secondaryMenu}
            mobileMenu={mobileMenu}
            onNavigate={router.push}
            {...props}
        />
    );
}

const getMenusByRole = (
    roles: TherifyUser.TherifyUser['roles'],
    hasChatEnabled = false
) => {
    const isTherapist = roles.includes(Role.provider_therapist);
    if (isTherapist) {
        return {
            primaryMenu: [...THERAPIST_MAIN_MENU],
            secondaryMenu: [...THERAPIST_SECONDARY_MENU],
            mobileMenu: [...THERAPIST_MOBILE_MENU],
        };
    }

    return {
        primaryMenu: [
            ...COACH_MAIN_MENU,
            hasChatEnabled ? CHAT : undefined,
        ].filter(Boolean) as NavigationLink[],
        secondaryMenu: [...COACH_SECONDARY_MENU],
        mobileMenu: [
            ...COACH_MOBILE_MENU,
            hasChatEnabled ? CHAT : undefined,
        ].filter(Boolean) as NavigationLink[],
    };
};
