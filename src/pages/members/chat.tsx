import { membersService } from '@/lib/modules/members/service';
import { ChatComponent } from '@/lib/modules/messaging/components';
import { ChatPageProps } from '@/lib/modules/providers/service/page-props/get-chat-page-props/getChatPageProps';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getChatPageProps,
    })
);

export default function ChatPage({ user }: ChatPageProps) {
    if (!user) {
        return <div>Chat is not available</div>;
    }
    if (!user.chatAccessToken || !user.userId) {
        return <div>Chat is not available</div>;
    }
    return (
        <MemberNavigationPage currentPath="/members/chat" user={user}>
            <ChatComponent
                userIdentifier={adaptUserIdentifier.makeStreamChatSafe(
                    user.userId!
                )}
                displayName={user.givenName}
                accessToken={user.chatAccessToken!}
            />
            ;
        </MemberNavigationPage>
    );
}
