import {
    MEMBER_SECONDARY_MENU,
    getMemberMobileMenu,
    getMemberMenu,
} from '@/lib/sitemap/menus/member-menu';
import { useChatClient } from '@/lib/modules/messaging/hooks';
import { URL_PATHS } from '@/lib/sitemap';
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
    const mainMenu = getMemberMenu(props.user?.hasChatEnabled ?? false);
    const mobileMenu = getMemberMobileMenu(props.user?.hasChatEnabled ?? false);
    const { ChatProvider, unreadChatMessagesCount } = useChatClient(props.user);

    return (
        <ChatProvider>
            <TopNavigationPage
                {...props}
                onNavigate={router.push}
                primaryMenu={mainMenu}
                secondaryMenu={[...MEMBER_SECONDARY_MENU]}
                mobileMenu={mobileMenu}
                isLoadingUser={false}
                chatNotifications={
                    unreadChatMessagesCount > 0
                        ? {
                              [URL_PATHS.MEMBERS.CHAT]: unreadChatMessagesCount,
                          }
                        : undefined
                }
            />
        </ChatProvider>
    );
}
