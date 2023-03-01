import {
    CenteredContainer,
    Modal,
    Divider,
    Textarea,
} from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

interface ActionConfirmationModalProps {
    action: 'accept' | 'decline' | 'terminate';
    connectionRequest: ConnectionRequest.Type;
    isLoading: boolean;
    onClose: () => void;
    onPrimaryButtonClick: (message?: string) => void;
}

export const ActionConfirmationModal = ({
    action,
    connectionRequest,
    isLoading,
    onClose,
    onPrimaryButtonClick,
}: ActionConfirmationModalProps) => {
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const {
        title,
        message,
        primaryButtonColor,
        primaryButtonText,
        textareaLabel,
        textareaPlaceholder,
    } = getConfirmationModalContent(action, connectionRequest);
    return (
        <Modal
            isOpen
            title={title}
            message={!isLoading ? message : undefined}
            onClose={onClose}
            fullWidthButtons
            primaryButtonColor={primaryButtonColor}
            primaryButtonText={primaryButtonText}
            primaryButtonOnClick={() =>
                onPrimaryButtonClick(
                    confirmationMessage.trim() === ''
                        ? undefined
                        : confirmationMessage
                )
            }
            primaryButtonDisabled={isLoading}
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={isLoading}
            secondaryButtonOnClick={onClose}
            postBodySlot={
                isLoading ? (
                    <CenteredContainer width="100%">
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <Box width="100%">
                        <Divider />
                        <Textarea
                            fullWidth
                            label={textareaLabel}
                            placeholder={textareaPlaceholder}
                            value={confirmationMessage}
                            onChange={(e) =>
                                setConfirmationMessage(e.target.value)
                            }
                        />
                    </Box>
                )
            }
        />
    );
};

const getConfirmationModalContent = (
    action: 'accept' | 'decline' | 'terminate',
    connectionRequst: ConnectionRequest.Type
) => {
    switch (action) {
        case 'decline':
            return {
                title: 'Decline New Client',
                message: `Declining ${connectionRequst.member.givenName} will notify them that you are unable to accept them as a client at this time.`,
                primaryButtonColor: 'error' as const,
                primaryButtonText: 'Decline',
                textareaLabel: 'Reason for declining (optional)',
                textareaPlaceholder:
                    'Let them know why you cannot accept at this time',
            };
        case 'terminate':
            return {
                title: 'End Client Relationship',
                message: `Removing ${connectionRequst.member.givenName} as a client will notify them that you are no longer able to provide services.`,
                primaryButtonColor: 'error' as const,
                primaryButtonText: 'Remove Client',
                textareaLabel: 'Note to client (optional)',
                textareaPlaceholder:
                    'Let them know why you are no longer able to provide services',
            };
        case 'accept':
        default:
            return {
                title: 'Accept New Client?',
                message: `Accepting ${connectionRequst.member.givenName} will notify them that you are ready to start working with them.`,
                primaryButtonColor: 'primary' as const,
                primaryButtonText: 'Accept',
                textareaLabel: 'Additional Information (optional)',
                textareaPlaceholder: `Share any additional details here`,
            };
    }
};
