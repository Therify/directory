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
import { VoidCoachingSessionInvoice } from '../../../features/billing';
interface InvoicedMember {
    memberId: string;
    givenName?: string;
}
type OnVoidInvoiceSuccessArgs = [
    result: VoidCoachingSessionInvoice.Output,
    error: null
];
type OnVoidInvoiceFailureArgs = [result: null, error: Error];

export type OnVoidInvoiceCallback = (
    ...args: OnVoidInvoiceSuccessArgs | OnVoidInvoiceFailureArgs
) => void;

export const useSessionInvoicing = (providerId: string) => {
    const { createAlert } = useContext(Alerts.Context);
    const [showModal, setShowModal] = useState(false);
    const [member, setMember] = useState<InvoicedMember | null>(null);
    const [sessionDate, setSessionDate] = useState<Date | null>(null);
    const [createSessionSuccessCallbackFn, setCreateSessionSuccessCbFn] =
        useState<(() => void) | null>(null);
    let voidSessionCallbackFn: OnVoidInvoiceCallback | null = null;

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
                createAlert({
                    type: 'success',
                    title: 'Session invoice created',
                });
                createSessionSuccessCallbackFn?.();
                setCreateSessionSuccessCbFn(null);
                return;
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

    const { mutate: voidInvoice, isLoading: isVoidingInvoice } =
        trpc.useMutation('accounts.billing.void-coaching-session-invoice', {
            onSuccess(result) {
                voidSessionCallbackFn?.(result, null);
            },
            onError(error) {
                if (error instanceof Error) {
                    voidSessionCallbackFn?.(null, error);
                    return;
                }
                voidSessionCallbackFn?.(
                    null,
                    new Error(
                        (error as { message: string }).message ??
                            'Error voiding invoice'
                    )
                );
            },
        });

    return {
        onInvoiceClient: (
            member: InvoicedMember,
            successCallback?: () => void
        ) => {
            setMember(member);
            setShowModal(true);
            setCreateSessionSuccessCbFn(() => successCallback ?? null);
        },
        onVoidInvoice: (
            input: VoidCoachingSessionInvoice.Input,
            callbackFn: OnVoidInvoiceCallback
        ) => {
            voidSessionCallbackFn = callbackFn;
            return voidInvoice(input);
        },
        isVoidingInvoice,
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
        showCloseButton={false}
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
