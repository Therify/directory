import {
    THERAPIST_MAIN_MENU,
    THERAPIST_SECONDARY_MENU,
    THERAPIST_MOBILE_MENU,
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { useRouter } from 'next/router';
import {
    SideNavigationPage,
    SideNavigationPageProps,
} from '../SideNavigationPage';
import { Role } from '@prisma/client';
import { CHAT, PAYMENTS } from '@/lib/sitemap/menus/coach-menu/links';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { useChatClient } from '@/lib/modules/messaging/hooks';

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
    const { ChatProvider, unreadChatMessagesCount } = useChatClient(props.user);
    const { flags } = useFeatureFlags(props.user);
    const { primaryMenu, secondaryMenu, mobileMenu } = getMenusByRole({
        roles: props.user?.roles ?? [],
        hasChatEnabled: props.user?.hasChatEnabled ?? false,
        withPaymentsLink: flags.hasStripeConnectAccess,
    });

    return (
        <ChatProvider>
            <SideNavigationPage
                primaryMenu={primaryMenu}
                secondaryMenu={secondaryMenu}
                mobileMenu={mobileMenu}
                onNavigate={router.push}
                chatNotifications={
                    unreadChatMessagesCount > 0
                        ? {
                              [URL_PATHS.PROVIDERS.COACH.CHAT]:
                                  unreadChatMessagesCount,
                          }
                        : undefined
                }
                {...props}
            />
        </ChatProvider>
    );
}

const getMenusByRole = ({
    roles,
    hasChatEnabled,
    withPaymentsLink,
}: {
    roles: TherifyUser.TherifyUser['roles'];
    hasChatEnabled: boolean;
    withPaymentsLink: boolean;
}) => {
    const isTherapist = roles.includes(Role.provider_therapist);
    if (isTherapist) {
        return {
            primaryMenu: [...THERAPIST_MAIN_MENU],
            secondaryMenu: [...THERAPIST_SECONDARY_MENU],
            mobileMenu: [...THERAPIST_MOBILE_MENU],
        };
    }

    return {
        primaryMenu: [...COACH_MAIN_MENU, ...(hasChatEnabled ? [CHAT] : [])],
        secondaryMenu: [
            ...(withPaymentsLink ? [{ ...PAYMENTS, icon: undefined }] : []),
            ...COACH_SECONDARY_MENU,
        ],
        mobileMenu: [
            ...COACH_MOBILE_MENU,
            ...(withPaymentsLink ? [PAYMENTS] : []),
            ...(hasChatEnabled ? [CHAT] : []),
        ],
    };
};
