import {
    ChatComponent,
    useRemoveHubspotChatWidget,
} from '@/lib/modules/messaging/components';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ChatPageProps } from '@/lib/modules/providers/service/page-props/get-chat-page-props/getChatPageProps';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getChatPageProps,
    })
);

export default function ChatPage({ user }: ChatPageProps) {
    useRemoveHubspotChatWidget();
    if (!user) {
        return <div>Chat is not available</div>;
    }
    if (!user.chatAccessToken || !user.userId) {
        return <div>Chat is not available</div>;
    }
    return (
        <ProviderNavigationPage currentPath="/providers/coach/chat" user={user}>
            <ChatComponent
                userIdentifier={adaptUserIdentifier.makeStreamChatSafe(
                    user.userId!
                )}
                displayName={user.givenName}
                accessToken={user.chatAccessToken!}
            />
        </ProviderNavigationPage>
    );
}
