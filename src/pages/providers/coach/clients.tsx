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
    Divider,
    Modal,
    Textarea,
} from '@/lib/shared/components/ui';
import { Box, CircularProgress } from '@mui/material';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getProviderClientsPageProps,
    })
);

export default function CoachClientsPage({
    user,
    connectionRequests: baseConnectionRequests,
}: ProviderClientsPageProps) {
    const [connectionRequests, setConnectionRequests] = useState(
        baseConnectionRequests ?? []
    );
    const { createAlert } = useContext(Alerts.Context);
    const [confirmAction, setConfirmAction] = useState<'accept' | 'decline'>();
    const [updateMessage, setUpdateMessage] = useState('');
    const [targetConnection, setTargetConnection] =
        useState<ConnectionRequest.Type>();

    const setUpConfirmationModal = (
        action: 'accept' | 'decline',
        request: ConnectionRequest.Type
    ) => {
        setTargetConnection(request);
        setConfirmAction(action);
    };

    const clearConfirmationModal = () => {
        setTargetConnection(undefined);
        setConfirmAction(undefined);
    };

    const { mutate: updateConnectionRequestStatus, isLoading } =
        trpc.useMutation(
            `directory.${UpdateConnectionRequestStatus.TRPC_ROUTE}`,
            {
                onSuccess: (
                    { success, errors },
                    { memberId, profileId, connectionStatus }
                ) => {
                    clearConfirmationModal();
                    if (success) {
                        createAlert({
                            type: 'success',
                            title:
                                connectionStatus === ConnectionStatus.accepted
                                    ? `${targetConnection?.member.givenName} is now your client!`
                                    : `Declined successfully`,
                        });
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
                    clearConfirmationModal();
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

    const handleUpdateConnectionRequest = (
        request: ConnectionRequest.Type,
        action: 'accept' | 'decline'
    ) =>
        updateConnectionRequestStatus({
            memberId: request.member.id,
            profileId: request.providerProfile.id,
            connectionStatus:
                action === 'accept'
                    ? ConnectionStatus.accepted
                    : ConnectionStatus.declined,
            userId: user.userId,
            message: updateMessage.trim() === '' ? updateMessage : undefined,
        });

    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.CLIENTS}
            user={user}
        >
            <ProviderClientListPage
                designation={ProfileType.coach}
                connectionRequests={connectionRequests}
                onAcceptConnectionRequest={(request) =>
                    setUpConfirmationModal('accept', request)
                }
                onDeclineConnectionRequest={(request) =>
                    setUpConfirmationModal('decline', request)
                }
            />
            {confirmAction && targetConnection && (
                <Modal
                    isOpen
                    title={
                        confirmAction === 'accept'
                            ? 'Accept new client?'
                            : 'Decline new client'
                    }
                    message={
                        confirmAction === 'accept' && !isLoading
                            ? `Accepting ${targetConnection.member.givenName} will notify them that you are ready to start working together.`
                            : undefined
                    }
                    onClose={clearConfirmationModal}
                    fullWidthButtons
                    primaryButtonColor={
                        confirmAction === 'accept' ? 'primary' : 'error'
                    }
                    primaryButtonText={
                        confirmAction === 'accept' ? 'Accept' : 'Decline'
                    }
                    primaryButtonOnClick={() => {
                        handleUpdateConnectionRequest(
                            targetConnection,
                            confirmAction
                        );
                    }}
                    primaryButtonDisabled={isLoading}
                    secondaryButtonText="Cancel"
                    secondaryButtonDisabled={isLoading}
                    secondaryButtonOnClick={clearConfirmationModal}
                    postBodySlot={
                        isLoading ? (
                            <CenteredContainer width="100%">
                                <CircularProgress />
                            </CenteredContainer>
                        ) : (
                            <Box width="100%">
                                {confirmAction === 'accept' && <Divider />}
                                <Textarea
                                    fullWidth
                                    label={
                                        confirmAction === 'accept'
                                            ? 'Share any additional details here (optional)'
                                            : 'Reason for declining (optional)'
                                    }
                                    placeholder={
                                        confirmAction === 'accept'
                                            ? 'Let them know about any unique next steps'
                                            : 'Let them know why you cannot accept at this time'
                                    }
                                    value={updateMessage}
                                    onChange={(e) =>
                                        setUpdateMessage(e.target.value)
                                    }
                                />
                            </Box>
                        )
                    }
                />
            )}
        </ProviderNavigationPage>
    );
}
