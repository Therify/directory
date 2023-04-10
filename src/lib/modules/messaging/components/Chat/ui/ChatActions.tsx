import { useChannelStateContext } from 'stream-chat-react';
import { CreditCardOutlined } from '@mui/icons-material';
import { FloatingList } from '@/lib/shared/components/ui';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { useSessionInvoicing } from '@/lib/modules/accounts/components/hooks';

interface ChatActionsProps {
    userIdentifier: string;
}

export const ChatActions = ({ userIdentifier }: ChatActionsProps) => {
    const { channel } = useChannelStateContext();
    const { onInvoiceClient, ConfirmationUi: SessionInvoiceConfirmation } =
        useSessionInvoicing(adaptUserIdentifier.fromStreamChat(userIdentifier));
    const handleInvoiceClient = () => {
        const memberIdentifier = Object.keys(channel.state.members).find(
            (key) => key != userIdentifier
        );
        if (!memberIdentifier)
            throw new Error('Could not find member id in channel');

        onInvoiceClient({
            memberId: adaptUserIdentifier.fromStreamChat(memberIdentifier),
        });
    };
    return (
        <>
            <FloatingList
                menuSx={{
                    '& ul.MuiList-root': {
                        width: 'auto',
                        maxWidth: '400px',
                    },
                }}
                listItems={[
                    {
                        icon: <CreditCardOutlined />,
                        text: 'Send Session Invoice',
                        title: 'This will create a Mental Health Coaching Session invoice for the member so they can purchase a session with you. Payment transfers can be viewed in your Stripe Connect Dashboard once the invoice has been paid.',
                        onClick: handleInvoiceClient,
                    },
                ]}
            />
            <SessionInvoiceConfirmation />
        </>
    );
};
