import { useChannelStateContext } from 'stream-chat-react';
import { useContext, useState } from 'react';
import { isValid as isValidDate, startOfDay } from 'date-fns';
import { Box, CircularProgress } from '@mui/material';
import { CreditCardOutlined } from '@mui/icons-material';
import {
    CenteredContainer,
    FloatingList,
    Modal,
    DatePicker,
} from '@/lib/shared/components/ui';
import { Alerts } from '@/lib/modules/alerts/context';
import { adaptUserIdentifier } from '@/lib/shared/vendors/stream-chat/adapt-user-identifier';
import { trpc } from '@/lib/shared/utils/trpc';

interface ChatActionsProps {
    userIdentifier: string;
}

export const ChatActions = ({ userIdentifier }: ChatActionsProps) => {
    const { createAlert } = useContext(Alerts.Context);
    const { channel } = useChannelStateContext();
    const [showModal, setShowModal] = useState(false);
    const [sessionDate, setSessionDate] = useState<Date | null>(null);
    const closeModal = () => {
        setShowModal(false);
        setSessionDate(null);
    };
    const {
        mutate: createCoachingSessionInvoice,
        isLoading: isCreatingSessionInvoice,
    } = trpc.useMutation('accounts.billing.create-coaching-session-checkout', {
        onSuccess: ({ invoiceId, errors }) => {
            if (invoiceId) {
                closeModal();
                return createAlert({
                    type: 'success',
                    title: 'Session invoice created',
                });
            }
            const [error] = errors;
            if (error) {
                createAlert({
                    type: 'error',
                    title: error,
                });
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                return createAlert({
                    type: 'error',
                    title: error.message,
                });
            }
            createAlert({
                type: 'error',
                title: 'There was an error creating the session invoice.',
            });
        },
    });
    const handleSendSessionInvoiceCreation = () => {
        const memberIdentifier = Object.keys(channel.state.members).find(
            (key) => key != userIdentifier
        );
        if (!memberIdentifier)
            throw new Error('Could not find member id in channel');
        if (sessionDate === null || !isValidDate(sessionDate)) {
            return createAlert({
                type: 'error',
                title: 'Invalid date selected',
            });
        }
        createCoachingSessionInvoice({
            memberId: adaptUserIdentifier.fromStreamChat(memberIdentifier),
            providerId: adaptUserIdentifier.fromStreamChat(userIdentifier),
            dateOfSession: startOfDay(sessionDate).toISOString(),
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
                        onClick: () => setShowModal(true),
                    },
                ]}
            />

            <Modal
                isOpen={showModal}
                onClose={closeModal}
                title="Send Session Invoice"
                message="An invoice for 1 coaching session will be created for this member. Payment transfers can be viewed in your Stripe Connect Dashboard once the invoice has been paid."
                primaryButtonDisabled={
                    isCreatingSessionInvoice || !isValidDate(sessionDate)
                }
                secondaryButtonDisabled={isCreatingSessionInvoice}
                primaryButtonText="Send"
                primaryButtonOnClick={handleSendSessionInvoiceCreation}
                postBodySlot={
                    <Box width="100%">
                        <DatePicker
                            required
                            disabled={isCreatingSessionInvoice}
                            label="Date of Session"
                            value={sessionDate}
                            onChange={(date) => setSessionDate(date)}
                        />
                        {isCreatingSessionInvoice ? (
                            <CenteredContainer sx={{ width: '100%' }}>
                                <CircularProgress />
                            </CenteredContainer>
                        ) : undefined}
                    </Box>
                }
                secondaryButtonText="Cancel"
                secondaryButtonOnClick={closeModal}
                fullWidthButtons
            />
        </>
    );
};
