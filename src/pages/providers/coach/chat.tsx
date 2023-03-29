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
import { useContext } from 'react';
import { Alerts } from '@/lib/modules/alerts/context';
import { URL_PATHS } from '@/lib/sitemap';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getChatPageProps,
    })
);

export default function ChatPage({ user }: ChatPageProps) {
    useRemoveHubspotChatWidget();
    const { createAlert } = useContext(Alerts.Context);
    if (!user) {
        return <div>Chat is not available</div>;
    }
    if (!user.chatAccessToken || !user.userId) {
        return <div>Chat is not available</div>;
    }
    const createSessionPurchaseLink = async (input: {
        memberId: string;
        providerId: string;
    }) => {
        const { checkoutUrl, errors } = await fetch(
            URL_PATHS.API.ACCOUNTS.BILLING.CREATE_COACHING_SESSION_CHECKOUT,
            {
                method: 'POST',
                body: JSON.stringify(input),
            }
        ).then((res) => res.json());

        if (checkoutUrl) {
            return checkoutUrl;
        }
        const [error] = errors;
        if (error) {
            createAlert({
                type: 'error',
                title: error,
            });
        }
    };
    return (
        <ProviderNavigationPage currentPath="/providers/coach/chat" user={user}>
            <ChatComponent
                userIdentifier={adaptUserIdentifier.makeStreamChatSafe(
                    user.userId!
                )}
                displayName={user.givenName}
                accessToken={user.chatAccessToken!}
                createSessionPurchaseLink={(memberId: string) =>
                    createSessionPurchaseLink({
                        memberId,
                        providerId: user.userId,
                    })
                }
            />
        </ProviderNavigationPage>
    );
}
