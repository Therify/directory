import { Alerts } from '@/lib/modules/alerts/context';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { ProvidersService } from '@/lib/modules/providers/service';
import { PracticeClientsPageProps } from '@/lib/modules/providers/service/page-props/get-practice-clients-page-props/getPracticeClientsPageProps';
import { PracticeAdminNavigationPage } from '@/lib/shared/components/features/pages/PracticeAdminNavigationPage';
import { PracticeClientListPage } from '@/lib/shared/components/features/pages/PracticeClientListPage/PracticeClientListPage';
import {
    CenteredContainer,
    Divider,
    Modal,
    Textarea,
} from '@/lib/shared/components/ui';
import { PracticeProfileConnectionRequests } from '@/lib/shared/types';
import { RBAC } from '@/lib/shared/utils';
import { trpc } from '@/lib/shared/utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, CircularProgress } from '@mui/material';
import { ConnectionStatus } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getPracticeClientsPageProps,
    })
);
type ProfileConnectionRequest =
    PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['connectionRequests'][number];

export default function PracticeClientsPage({
    practiceConnectionRequests: basePracticeConnectionRequests,
    user,
}: PracticeClientsPageProps) {
    const { createAlert } = useContext(Alerts.Context);
    const [practiceConnectionRequests, setPracticeConnectionRequests] =
        useState(basePracticeConnectionRequests);
    const [confirmAction, setConfirmAction] = useState<'accept' | 'decline'>();
    const [updateMessage, setUpdateMessage] = useState('');
    const [confirmationConnectionRequest, setConfirmationConnectionRequest] =
        useState<
            ProfileConnectionRequest & {
                profile: PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['providerProfile'];
            }
        >();
    const [targetConnection, setTargetConnection] = useState<{
        memberId: string;
        profileId: string;
    }>();

    useEffect(() => {
        if (targetConnection === undefined)
            return setConfirmationConnectionRequest(undefined);
        const confirmationProvider =
            practiceConnectionRequests?.profileConnectionRequests.find(
                (connection) => {
                    return (
                        connection.providerProfile.id ===
                        targetConnection?.profileId
                    );
                }
            );
        const connectionRequest = confirmationProvider?.connectionRequests.find(
            (memberRequests) =>
                memberRequests.member.id === targetConnection?.memberId
        );
        const confirmationPayload =
            !!confirmationProvider?.providerProfile && !!connectionRequest
                ? {
                      ...connectionRequest,
                      profile: confirmationProvider.providerProfile,
                  }
                : undefined;

        setConfirmationConnectionRequest(confirmationPayload);
    }, [
        practiceConnectionRequests?.profileConnectionRequests,
        targetConnection,
    ]);

    const setUpConfirmationModal = (
        action: 'accept' | 'decline',
        request: { memberId: string; profileId: string }
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
                                    ? `${
                                          confirmationConnectionRequest?.member
                                              .givenName ?? 'The member'
                                      } is now a client!`
                                    : `Declined successfully`,
                        });
                        if (connectionStatus === ConnectionStatus.accepted) {
                            return setPracticeConnectionRequests({
                                ...practiceConnectionRequests,
                                profileConnectionRequests:
                                    practiceConnectionRequests.profileConnectionRequests.map(
                                        (profile) => {
                                            if (
                                                profile.providerProfile.id !==
                                                profileId
                                            )
                                                return profile;
                                            return {
                                                ...profile,
                                                connectionRequests:
                                                    profile.connectionRequests.map(
                                                        (cr) => {
                                                            if (
                                                                cr.member.id ===
                                                                    memberId &&
                                                                profile
                                                                    .providerProfile
                                                                    .id ===
                                                                    profileId
                                                            ) {
                                                                return {
                                                                    ...cr,
                                                                    connectionStatus,
                                                                };
                                                            }
                                                            return cr;
                                                        }
                                                    ),
                                            };
                                        }
                                    ),
                            });
                        }
                        return setPracticeConnectionRequests({
                            ...practiceConnectionRequests,
                            profileConnectionRequests:
                                practiceConnectionRequests.profileConnectionRequests.filter(
                                    (profile) => {
                                        if (
                                            profile.providerProfile.id !==
                                            profileId
                                        )
                                            return profile;
                                        const updatedProfile = {
                                            ...profile,
                                            connectionRequests:
                                                profile.connectionRequests.filter(
                                                    (cr) => {
                                                        const isDeclinedRequest =
                                                            cr.member.id ==
                                                                memberId &&
                                                            profile
                                                                .providerProfile
                                                                .id ===
                                                                profileId;
                                                        return !isDeclinedRequest;
                                                    }
                                                ),
                                        };
                                        return (
                                            updatedProfile.connectionRequests
                                                .length > 0
                                        );
                                    }
                                ),
                        });
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
        { memberId, profileId }: { memberId: string; profileId: string },
        action: 'accept' | 'decline'
    ) =>
        updateConnectionRequestStatus({
            memberId,
            profileId,
            connectionStatus:
                action === 'accept'
                    ? ConnectionStatus.accepted
                    : ConnectionStatus.declined,
            userId: user.userId,
            message: updateMessage.trim() === '' ? updateMessage : undefined,
        });
    return (
        <PracticeAdminNavigationPage
            user={user}
            currentPath={'/providers/practice/clients'}
        >
            {practiceConnectionRequests && (
                <PracticeClientListPage
                    practiceConnectionRequests={practiceConnectionRequests}
                    onAcceptConnectionRequest={(input) => {
                        setUpConfirmationModal('accept', input);
                    }}
                    onDeclineConnectionRequest={(input) => {
                        setUpConfirmationModal('decline', input);
                    }}
                />
            )}
            {confirmAction &&
                targetConnection &&
                confirmationConnectionRequest && (
                    <Modal
                        isOpen
                        title={
                            confirmAction === 'accept'
                                ? 'Accept new client?'
                                : 'Decline new client'
                        }
                        message={
                            confirmAction === 'accept' && !isLoading
                                ? `Accepting ${confirmationConnectionRequest.member.givenName} will notify them that ${confirmationConnectionRequest.profile.givenName} is ready to start working with them.`
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
                                    <Divider />
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
        </PracticeAdminNavigationPage>
    );
}
