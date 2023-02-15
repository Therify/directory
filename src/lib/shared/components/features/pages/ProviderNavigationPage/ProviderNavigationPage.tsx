import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { useRouter } from 'next/router';
import {
    SideNavigationPage,
    SideNavigationPageProps,
} from '../SideNavigationPage';
import { Role } from '@prisma/client';

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
        props.user?.roles ?? []
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

const getMenusByRole = (roles: TherifyUser.TherifyUser['roles']) => {
    const isTherapist = roles.includes(Role.provider_therapist);
    if (isTherapist) {
        return {
            primaryMenu: [...THERAPIST_MAIN_MENU],
            secondaryMenu: [...THERAPIST_SECONDARY_MENU],
            mobileMenu: [...THERAPIST_MOBILE_MENU],
        };
    }

    return {
        primaryMenu: [...COACH_MAIN_MENU],
        secondaryMenu: [...COACH_SECONDARY_MENU],
        mobileMenu: [...COACH_MOBILE_MENU],
    };
};
