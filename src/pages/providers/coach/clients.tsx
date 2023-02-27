import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { ProvidersService } from '@/lib/modules/providers/service';
import { RBAC } from '@/lib/shared/utils';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { ProviderClientsPageProps } from '@/lib/modules/providers/service/page-props/get-clients-page-props/getProviderClientsPageProps';
import { ProviderClientListPage } from '@/lib/shared/components/features/pages/ProviderClientListPage/ProviderClientListPage';
import { ConnectionStatus, ProfileType } from '@prisma/client';
import { trpc } from '@/lib/shared/utils/trpc';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { useContext, useState } from 'react';
import { Alerts } from '@/lib/modules/alerts/context';
import { ConnectionRequest } from '@/lib/shared/types';
import {
    CenteredContainer,
    Modal,
    Textarea,
    Divider,
} from '@/lib/shared/components/ui';
import { CircularProgress, Box } from '@mui/material';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getProviderClientsPageProps,
    })
);

type ConnectionAction = 'accept' | 'decline' | 'terminate';

export default function CoachClientsPage({
    user,
    connectionRequests: baseConnectionRequests,
}: ProviderClientsPageProps) {
    const [connectionRequests, setConnectionRequests] = useState(
        baseConnectionRequests ?? []
    );
    const { createAlert } = useContext(Alerts.Context);
    const [updateMessage, setUpdateMessage] = useState('');
    const [targetConnection, setTargetConnection] = useState<{
        action: ConnectionAction;
        connectionRequest: ConnectionRequest.Type;
    }>();
    const closeModal = () => {
        setUpdateMessage('');
        setTargetConnection(undefined);
    };

    const { mutate: updateConnectionRequestStatus, isLoading } =
        trpc.useMutation(
            `directory.${UpdateConnectionRequestStatus.TRPC_ROUTE}`,
            {
                onSuccess: (
                    { success, errors },
                    { memberId, profileId, connectionStatus }
                ) => {
                    if (success) {
                        createAlert({
                            type: 'success',
                            title:
                                connectionStatus === ConnectionStatus.accepted
                                    ? `${targetConnection?.connectionRequest.member.givenName} is now your client!`
                                    : connectionStatus ===
                                      ConnectionStatus.terminated
                                    ? `${targetConnection?.connectionRequest.member.givenName} is no longer your client`
                                    : `Declined successfully`,
                        });
                        closeModal();
                        if (connectionStatus === ConnectionStatus.accepted) {
                            return setConnectionRequests(
                                connectionRequests.map((cr) => {
                                    if (
                                        cr.member.id === memberId &&
                                        cr.providerProfile.id === profileId
                                    ) {
                                        return {
                                            ...cr,
                                            connectionStatus,
                                        };
                                    }
                                    return cr;
                                })
                            );
                        }
                        return setConnectionRequests(
                            connectionRequests.filter((cr) => {
                                const isDeclinedRequest =
                                    cr.member.id == memberId &&
                                    cr.providerProfile.id === profileId;
                                return !isDeclinedRequest;
                            })
                        );
                    }
                    const [error] = errors;
                    if (error) {
                        console.error(error);
                        createAlert({
                            type: 'error',
                            title: error,
                        });
                    }
                },
                onError: (error) => {
                    closeModal();
                    console.error(error);
                    const errorMessage =
                        error instanceof Error
                            ? error.message
                            : 'An error occurred';
                    createAlert({
                        type: 'error',
                        title: errorMessage,
                    });
                },
            }
        );

    const handleUpdateConnectionRequest = ({
        action,
        connectionRequest,
    }: {
        connectionRequest: ConnectionRequest.Type;
        action: ConnectionAction;
    }) =>
        updateConnectionRequestStatus({
            memberId: connectionRequest.member.id,
            profileId: connectionRequest.providerProfile.id,
            connectionStatus:
                action === 'accept'
                    ? ConnectionStatus.accepted
                    : action === 'terminate'
                    ? ConnectionStatus.terminated
                    : ConnectionStatus.declined,
            userId: user.userId,
            message: updateMessage.trim() !== '' ? updateMessage : undefined,
        });

    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.CLIENTS}
            user={user}
        >
            <ProviderClientListPage
                designation={ProfileType.coach}
                connectionRequests={connectionRequests}
                onAcceptConnectionRequest={(connectionRequest) =>
                    setTargetConnection({
                        action: 'accept',
                        connectionRequest,
                    })
                }
                onDeclineConnectionRequest={(connectionRequest) =>
                    setTargetConnection({
                        action: 'decline',
                        connectionRequest,
                    })
                }
                onTerminateConnectionRequest={(connectionRequest) =>
                    setTargetConnection({
                        action: 'terminate',
                        connectionRequest,
                    })
                }
            />
            {targetConnection && (
                <ConfirmationModal
                    action={targetConnection.action}
                    connectionRequest={targetConnection.connectionRequest}
                    isLoading={isLoading}
                    textAreaValue={updateMessage}
                    onTextAreaChange={setUpdateMessage}
                    onClose={closeModal}
                    onPrimaryButtonClick={() =>
                        handleUpdateConnectionRequest(targetConnection)
                    }
                />
            )}
        </ProviderNavigationPage>
    );
}

const ConfirmationModal = (props: {
    action: ConnectionAction;
    connectionRequest: ConnectionRequest.Type;
    isLoading: boolean;
    textAreaValue: string;
    onTextAreaChange: (message: string) => void;
    onClose: () => void;
    onPrimaryButtonClick: () => void;
}) => {
    const {
        title,
        message,
        primaryButtonColor,
        primaryButtonText,
        textareaLabel,
        textareaPlaceholder,
    } = getConfirmationModalContent(props.action, props.connectionRequest);
    return (
        <Modal
            isOpen
            title={title}
            message={!props.isLoading ? message : undefined}
            onClose={props.onClose}
            fullWidthButtons
            primaryButtonColor={primaryButtonColor}
            primaryButtonText={primaryButtonText}
            primaryButtonOnClick={props.onPrimaryButtonClick}
            primaryButtonDisabled={props.isLoading}
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={props.isLoading}
            secondaryButtonOnClick={props.onClose}
            postBodySlot={
                props.isLoading ? (
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
                            value={props.textAreaValue}
                            onChange={(e) =>
                                props.onTextAreaChange(e.target.value)
                            }
                        />
                    </Box>
                )
            }
        />
    );
};

const getConfirmationModalContent = (
    action: ConnectionAction,
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
