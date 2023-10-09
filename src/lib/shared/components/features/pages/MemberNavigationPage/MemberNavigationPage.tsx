import {
    MEMBER_SECONDARY_MENU,
    MEMBER_SECONDARY_MENU_V3,
    getMemberMobileMenu,
    getMemberMenu,
    MEMBER_MAIN_MENU_V3,
    MEMBER_MOBILE_MENU_V3,
} from '@/lib/sitemap/menus/member-menu';
import { useChatClient } from '@/lib/modules/messaging/hooks';
import { URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { useRouter } from 'next/router';
import { useFeatureFlags } from '@/lib/shared/hooks';
import {
    TopNavigationPage as TopNavigationPageV2,
    TopNavigationPageProps,
} from '../TopNavigationPage';
import { TopNavigationPage as TopNavigationPageV3 } from '../v3/TopNavigationPage';

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
    const { flags } = useFeatureFlags(props.user ?? undefined);
    const { ChatProvider, unreadChatMessagesCount } = useChatClient(props.user);

    const chatNotifications =
        unreadChatMessagesCount > 0
            ? {
                  [URL_PATHS.MEMBERS.CHAT]: unreadChatMessagesCount,
              }
            : undefined;
    return (
        <ChatProvider>
            {flags.isV3DirectoryEnabled ? (
                <TopNavigationPageV3
                    {...props}
                    onNavigate={router.push}
                    primaryMenu={[...MEMBER_MAIN_MENU_V3]}
                    secondaryMenu={[...MEMBER_SECONDARY_MENU_V3]}
                    mobileMenu={[...MEMBER_MOBILE_MENU_V3]}
                    isLoadingUser={false}
                    chatNotifications={chatNotifications}
                />
            ) : (
                <TopNavigationPageV2
                    {...props}
                    onNavigate={router.push}
                    primaryMenu={getMemberMenu(
                        props.user?.hasChatEnabled ?? false
                    )}
                    secondaryMenu={[...MEMBER_SECONDARY_MENU]}
                    mobileMenu={getMemberMobileMenu(
                        props.user?.hasChatEnabled ?? false
                    )}
                    isLoadingUser={false}
                    chatNotifications={chatNotifications}
                />
            )}
        </ChatProvider>
    );
}
