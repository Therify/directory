import { useContext, useState } from 'react';
import { Alerts } from '@/lib/modules/alerts/context';
import { ConnectionRequest } from '@/lib/shared/types';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { trpc } from '@/lib/shared/utils/trpc';
import { ConnectionStatus } from '@prisma/client';

type ConnectionAction = 'accept' | 'decline' | 'terminate';

export const useProviderConnectionRequests = (
    userId: string,
    baseConnectionRequests: ConnectionRequest.Type[]
) => {
    const [connectionRequests, setConnectionRequests] = useState(
        baseConnectionRequests
    );
    const { createAlert } = useContext(Alerts.Context);
    const [confirmationConnectionRequest, setConfirmationConnectionRequest] =
        useState<{
            action: ConnectionAction;
            connectionRequest: ConnectionRequest.Type;
        }>();

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
                                    ? `${confirmationConnectionRequest?.connectionRequest.member.givenName} is now your client!`
                                    : connectionStatus ===
                                      ConnectionStatus.terminated
                                    ? `${confirmationConnectionRequest?.connectionRequest.member.givenName} is no longer your client`
                                    : `Declined successfully`,
                        });
                        setConfirmationConnectionRequest(undefined);
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
                    setConfirmationConnectionRequest(undefined);
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
        message,
    }: {
        connectionRequest: ConnectionRequest.Type;
        action: ConnectionAction;
        message?: string;
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
            userId,
            message,
        });

    return {
        connectionRequests,
        handleUpdateConnectionRequest,
        isUpdatingConnectionRequestStatus: isLoading,
        setConfirmationConnectionRequest,
        confirmationConnectionRequest,
    };
};
