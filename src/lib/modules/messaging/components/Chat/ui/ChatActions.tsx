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
            .then((checkoutLink) => {
                channel.sendMessage({
                    text: `Here is a link to purchase a session with me:
                ${checkoutLink}

                This link will expire in 24 hours.`,
                });
                setShowModal(false);
                setIsCreatingCheckoutSession(false);
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
                        text: 'Send Session Purchase Link',
                        onClick: () => setShowModal(true),
                    },
                ]}
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Send Session Purchase Link"
                message="Are you sure you want to send a purchase link to this client? This will allow them to purchase one session with you. Links expire in 24 hours."
                primaryButtonDisabled={isCreatingCheckoutSession}
                secondaryButtonDisabled={isCreatingCheckoutSession}
                primaryButtonText="Send"
                primaryButtonOnClick={handleSendSessionPurchaseLink}
                postBodySlot={
                    isCreatingCheckoutSession ? (
                        <CenteredContainer>
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
