import { useContext, useState } from 'react';
import { isValid as isValidDate, startOfDay } from 'date-fns';
import { Alerts } from '@/lib/modules/alerts/context';
import { trpc } from '@/lib/shared/utils/trpc';
import { Box, CircularProgress } from '@mui/material';
import {
    CenteredContainer,
    Modal,
    DatePicker,
} from '@/lib/shared/components/ui';
interface InvoicedMember {
    memberId: string;
    givenName?: string;
}
export const useSessionInvoicing = (providerId: string) => {
    const { createAlert } = useContext(Alerts.Context);
    const [showModal, setShowModal] = useState(false);
    const [member, setMember] = useState<InvoicedMember | null>(null);
    const [sessionDate, setSessionDate] = useState<Date | null>(null);
    const closeModal = () => {
        setShowModal(false);
        setSessionDate(null);
        setMember(null);
    };
    const {
        mutate: createSessionInvoice,
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
                console.error(error);
                createAlert({
                    type: 'error',
                    title: error,
                    requireInteraction: true,
                });
            }
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof Error) {
                return createAlert({
                    type: 'error',
                    title: error.message,
                    requireInteraction: true,
                });
            }
            createAlert({
                type: 'error',
                title: 'There was an error creating the session invoice.',
            });
        },
    });

    const handleSendSessionInvoiceCreation = () => {
        if (!member) {
            return createAlert({
                type: 'error',
                title: 'Missing member id',
            });
        }
        if (sessionDate === null || !isValidDate(sessionDate)) {
            return createAlert({
                type: 'error',
                title: 'Invalid date selected',
            });
        }
        createSessionInvoice({
            memberId: member.memberId,
            providerId,
            dateOfSession: startOfDay(sessionDate).toISOString(),
        });
    };

    return {
        onInvoiceClient: (member: InvoicedMember) => {
            setMember(member);
            setShowModal(true);
        },
        isCreatingSessionInvoice,
        ConfirmationUi: () => (
            <>
                {showModal && (
                    <ConfirmationModal
                        memberName={member?.givenName}
                        closeModal={closeModal}
                        sessionDate={sessionDate}
                        setSessionDate={setSessionDate}
                        isSubmitting={isCreatingSessionInvoice}
                        isSubmitDisabled={
                            isCreatingSessionInvoice ||
                            !isValidDate(sessionDate) ||
                            !member
                        }
                        onSubmit={handleSendSessionInvoiceCreation}
                    />
                )}
            </>
        ),
    };
};

interface ConfirmationModalProps {
    memberName?: string;
    closeModal: () => void;
    isSubmitDisabled: boolean;
    isSubmitting: boolean;
    onSubmit: () => void;
    sessionDate: Date | null;
    setSessionDate: (date: Date | null) => void;
}

const ConfirmationModal = ({
    memberName,
    closeModal,
    isSubmitDisabled,
    isSubmitting,
    onSubmit,
    sessionDate,
    setSessionDate,
}: ConfirmationModalProps) => (
    <Modal
        isOpen
        onClose={closeModal}
        title={'Send Session Invoice' + (memberName ? ` to ${memberName}` : '')}
        message={`An invoice for 1 coaching session will be created for ${
            memberName ?? 'this member'
        }. Once the invoice has been paid, payouts can be viewed in your Stripe Connect Dashboard.`}
        primaryButtonDisabled={isSubmitDisabled}
        secondaryButtonDisabled={isSubmitting}
        primaryButtonText="Send"
        primaryButtonOnClick={onSubmit}
        postBodySlot={
            <Box width="100%">
                <DatePicker
                    required
                    disabled={isSubmitting}
                    label="Date of Session"
                    value={sessionDate}
                    onChange={(date) => setSessionDate(date)}
                />
                {isSubmitting ? (
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
);
