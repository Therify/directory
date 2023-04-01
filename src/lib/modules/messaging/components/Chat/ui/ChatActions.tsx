import { useChannelStateContext } from 'stream-chat-react';
import { useContext, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { CreditCardOutlined } from '@mui/icons-material';
import {
    CenteredContainer,
    FloatingList,
    Modal,
} from '@/lib/shared/components/ui';
import { Alerts } from '@/lib/modules/alerts/context';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';

interface ChatActionsProps {
    userIdentifier: string;
    createSessionPurchaseLink: (memberId: string) => Promise<string>;
}

export const ChatActions = ({
    createSessionPurchaseLink,
    userIdentifier,
}: ChatActionsProps) => {
    const { createAlert } = useContext(Alerts.Context);
    const { channel } = useChannelStateContext();
    const [showModal, setShowModal] = useState(false);
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false);
    const handleSendSessionPurchaseLink = () => {
        setIsCreatingCheckoutSession(true);
        const memberIdentifier = Object.keys(channel.state.members).find(
            (key) => key != userIdentifier
        );
        if (!memberIdentifier)
            throw new Error('Could not find member id in channel');
        const memberId = adaptUserIdentifier.fromStreamChat(memberIdentifier);

        createSessionPurchaseLink(memberId)
            .then(() => {
                setShowModal(false);
                setIsCreatingCheckoutSession(false);
                createAlert({
                    type: 'success',
                    title: 'Session Invoice Sent',
                });
            })
            .catch((err: Error) => {
                console.error(err);
                setIsCreatingCheckoutSession(false);
                createAlert({
                    type: 'error',
                    title: err.message,
                });
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
                        title: 'This will email a Mental Health Coaching Session invoice to the member so they can purchase a session with you. Payments can be viewed in your Stripe Connect Dashboard once the invoice has been paid.',
                        onClick: () => setShowModal(true),
                    },
                ]}
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Send Session Invoice"
                message="Stripe will email an invoice for 1 coaching session with you to this member. Payments can be viewed in your Stripe Connect Dashboard once the invoice has been paid."
                primaryButtonDisabled={isCreatingCheckoutSession}
                secondaryButtonDisabled={isCreatingCheckoutSession}
                primaryButtonText="Send"
                primaryButtonOnClick={handleSendSessionPurchaseLink}
                postBodySlot={
                    isCreatingCheckoutSession ? (
                        <CenteredContainer sx={{ width: '100%' }}>
                            <CircularProgress />
                        </CenteredContainer>
                    ) : undefined
                }
                secondaryButtonText="Cancel"
                secondaryButtonOnClick={() => setShowModal(false)}
                fullWidthButtons
            />
        </>
    );
};
