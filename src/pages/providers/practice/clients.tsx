import { Alerts } from '@/lib/modules/alerts/context';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import { ReimbursementModal } from '@/lib/modules/providers/components/Clients';
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
import { useFeatureFlags } from '@/lib/shared/hooks';
import {
    ConnectionRequest,
    PracticeProfileConnectionRequests,
} from '@/lib/shared/types';
import { RBAC } from '@/lib/shared/utils';
import { trpc } from '@/lib/shared/utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, CircularProgress } from '@mui/material';
import { ConnectionStatus, ProfileType } from '@prisma/client';
import { useContext, useMemo, useState } from 'react';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getPracticeClientsPageProps,
    })
);
type ConfirmationConnectionRequest =
    | (PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['connectionRequests'][number] & {
          profile: PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['providerProfile'];
      })
    | undefined;
type ConnectionAction = 'accept' | 'decline' | 'terminate' | 'reimburse';
export default function PracticeClientsPage({
    practiceConnectionRequests: basePracticeConnectionRequests,
    user,
}: PracticeClientsPageProps) {
    const { flags } = useFeatureFlags(user);
    const { createAlert } = useContext(Alerts.Context);
    const [practiceConnectionRequests, setPracticeConnectionRequests] =
        useState(basePracticeConnectionRequests);
    const [updateMessage, setUpdateMessage] = useState('');
    const [targetConnection, setTargetConnection] = useState<{
        action: ConnectionAction;
        ids: {
            memberId: string;
            profileId: string;
        };
    }>();
    const closeModal = () => {
        setUpdateMessage('');
        setTargetConnection(undefined);
    };

    const confirmationConnectionRequest: ConfirmationConnectionRequest =
        useMemo(() => {
            if (targetConnection === undefined) return undefined;
            const provider =
                practiceConnectionRequests?.profileConnectionRequests.find(
                    (connection) => {
                        return (
                            connection.providerProfile.id ===
                            targetConnection?.ids.profileId
                        );
                    }
                );
            const connectionRequest = provider?.connectionRequests.find(
                (memberRequests) =>
                    memberRequests.member.id === targetConnection?.ids.memberId
            );
            return provider?.providerProfile !== undefined &&
                connectionRequest !== undefined
                ? {
                      ...connectionRequest,
                      profile: provider.providerProfile,
                  }
                : undefined;
        }, [
            practiceConnectionRequests?.profileConnectionRequests,
            targetConnection,
        ]);

    const handleSuccess = ({
        connectionStatus,
        memberId,
        profileId,
    }: {
        connectionStatus: ConnectionStatus;
        profileId: string;
        memberId: string;
    }) => {
        createAlert({
            type: 'success',
            title:
                connectionStatus === ConnectionStatus.accepted
                    ? `${
                          confirmationConnectionRequest?.member.givenName ??
                          'The member'
                      } is now a client!`
                    : connectionStatus === ConnectionStatus.terminated
                    ? `Removed ${
                          confirmationConnectionRequest?.member.givenName ??
                          'the member'
                      } as a client`
                    : `Declined successfully`,
        });
        if (connectionStatus === ConnectionStatus.accepted) {
            // Update the connection request status
            return setPracticeConnectionRequests({
                ...practiceConnectionRequests,
                profileConnectionRequests:
                    practiceConnectionRequests.profileConnectionRequests.map(
                        (profile) => {
                            if (profile.providerProfile.id !== profileId)
                                return profile;
                            return {
                                ...profile,
                                connectionRequests:
                                    profile.connectionRequests.map((cr) => {
                                        if (
                                            cr.member.id === memberId &&
                                            profile.providerProfile.id ===
                                                profileId
                                        ) {
                                            return {
                                                ...cr,
                                                connectionStatus,
                                            };
                                        }
                                        return cr;
                                    }),
                            };
                        }
                    ),
            });
        }
        // Remove the declined or terminated connection request
        return setPracticeConnectionRequests({
            ...practiceConnectionRequests,
            profileConnectionRequests:
                practiceConnectionRequests.profileConnectionRequests.filter(
                    (profile) => {
                        if (profile.providerProfile.id !== profileId)
                            return profile;
                        const updatedProfile = {
                            ...profile,
                            connectionRequests:
                                profile.connectionRequests.filter((cr) => {
                                    const isDeclinedRequest =
                                        cr.member.id == memberId &&
                                        profile.providerProfile.id ===
                                            profileId;
                                    return !isDeclinedRequest;
                                }),
                        };
                        return updatedProfile.connectionRequests.length > 0;
                    }
                ),
        });
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
                        handleSuccess({
                            connectionStatus,
                            memberId,
                            profileId,
                        });
                    }
                    closeModal();
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
        ids: { memberId, profileId },
        action,
    }: {
        ids: { memberId: string; profileId: string };
        action: ConnectionAction;
    }) =>
        updateConnectionRequestStatus({
            memberId,
            profileId,
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
        <PracticeAdminNavigationPage
            user={user}
            currentPath={'/providers/practice/clients'}
        >
            {practiceConnectionRequests && (
                <PracticeClientListPage
                    useIframeReimbursementRequest={
                        flags.useIframeReimbursementRequest
                    }
                    practiceConnectionRequests={practiceConnectionRequests}
                    onReimbursementRequest={(ids) =>
                        setTargetConnection({
                            action: 'reimburse',
                            ids,
                        })
                    }
                    onAcceptConnectionRequest={(ids) =>
                        setTargetConnection({
                            action: 'accept',
                            ids,
                        })
                    }
                    onDeclineConnectionRequest={(ids) =>
                        setTargetConnection({
                            action: 'decline',
                            ids,
                        })
                    }
                    onTerminateConnectionRequest={(ids) =>
                        setTargetConnection({
                            action: 'terminate',
                            ids,
                        })
                    }
                />
            )}
            {targetConnection &&
                targetConnection.action !== 'reimburse' &&
                confirmationConnectionRequest && (
                    <ConfirmationModal
                        action={targetConnection.action}
                        connectionRequest={confirmationConnectionRequest}
                        onClose={closeModal}
                        onPrimaryButtonClick={() => {
                            handleUpdateConnectionRequest(targetConnection);
                        }}
                        isLoading={isLoading}
                        textAreaValue={updateMessage}
                        onTextAreaChange={(message) =>
                            setUpdateMessage(message)
                        }
                    />
                )}
            {flags.useIframeReimbursementRequest &&
                targetConnection &&
                targetConnection.action === 'reimburse' &&
                confirmationConnectionRequest && (
                    <ProfileReimbursementModal
                        designation={
                            confirmationConnectionRequest.profile.designation
                        }
                        practice={practiceConnectionRequests.practice}
                        confirmationConnectionRequest={
                            confirmationConnectionRequest
                        }
                        onClose={closeModal}
                    />
                )}
        </PracticeAdminNavigationPage>
    );
}

const ConfirmationModal = (props: {
    action: ConnectionAction;
    connectionRequest: Exclude<ConfirmationConnectionRequest, undefined>;
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
            message={message}
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
                            helperText="* This note will be shared with the client."
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
    connectionRequst: Exclude<ConfirmationConnectionRequest, undefined>
) => {
    switch (action) {
        case 'decline':
            return {
                title: 'Decline New Client',
                message: `Declining ${connectionRequst.member.givenName} will notify them that ${connectionRequst.profile.givenName} is unable to accept them as a client at this time.`,
                primaryButtonColor: 'error' as const,
                primaryButtonText: 'Decline',
                textareaLabel: 'Reason for declining (optional)',
                textareaPlaceholder: `Let them know why ${connectionRequst.profile.givenName} cannot accept at this time`,
            };
        case 'terminate':
            return {
                title: 'End Client Relationship',
                message: `Removing ${connectionRequst.member.givenName} as a client will notify them that ${connectionRequst.profile.givenName} is no longer able to provide services.`,
                primaryButtonColor: 'error' as const,
                primaryButtonText: 'Remove Client',
                textareaLabel: 'Note to client (optional)',
                textareaPlaceholder: `Let them know why ${connectionRequst.profile.givenName} is no longer able to provide services`,
            };
        case 'accept':
        default:
            return {
                title: 'Accept New Client?',
                message: `Accepting ${connectionRequst.member.givenName} will notify them that ${connectionRequst.profile.givenName} is ready to start working with them.`,
                primaryButtonColor: 'primary' as const,
                primaryButtonText: 'Accept',
                textareaLabel: 'Additional Information (optional)',
                textareaPlaceholder: `Share any additional details here`,
            };
    }
};

const ProfileReimbursementModal = ({
    confirmationConnectionRequest,
    designation,
    practice,
    onClose,
}: {
    designation: ProfileType;
    confirmationConnectionRequest: Exclude<
        ConfirmationConnectionRequest,
        undefined
    >;
    practice: PracticeProfileConnectionRequests.Type['practice'];
    onClose: () => void;
}) => {
    const connectionRequest: ConnectionRequest.Type = {
        connectionStatus: confirmationConnectionRequest.connectionStatus,
        connectionMessage: confirmationConnectionRequest.connectionMessage,
        createdAt: confirmationConnectionRequest.createdAt,
        updatedAt: confirmationConnectionRequest.updatedAt,
        member: confirmationConnectionRequest.member,
        providerProfile: {
            ...confirmationConnectionRequest.profile,
            practice,
        },
    };
    return (
        <ReimbursementModal
            designation={designation}
            connectionRequest={connectionRequest}
            onClose={onClose}
        />
    );
};
