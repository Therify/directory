import { useState } from 'react';
import { ConnectionRequest, TherifyUser } from '@/lib/shared/types';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { formatReimbursementRequestUrl } from '@/lib/shared/utils';
import {
    ActionConfirmationModal,
    ClientList,
    MemberDetailsModal,
} from '@/lib/modules/providers/components/Clients';
import { useProviderConnectionRequests } from '@/lib/modules/providers/components/hooks';
import { H1 } from '@/lib/shared/components/ui';
import { ProfileType } from '@prisma/client';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;

interface ProviderClientListPageProps {
    baseConnectionRequests: ConnectionRequest.Type[];
    designation: ProfileType;
    user: TherifyUser.TherifyUser;
}

export function ProviderClientListPage({
    baseConnectionRequests,
    designation,
    user,
}: ProviderClientListPageProps) {
    const theme = useTheme();
    const {
        connectionRequests,
        confirmationConnectionRequest,
        setConfirmationConnectionRequest,
        handleUpdateConnectionRequest,
        isUpdatingConnectionRequestStatus,
    } = useProviderConnectionRequests(
        user.userId,
        baseConnectionRequests ?? []
    );
    const [memberDetails, setMemberDetails] =
        useState<ConnectionRequest.Type>();
    return (
        <PageContainer>
            <Box
                marginBottom={theme.spacing(1)}
                marginTop={theme.spacing(10)}
                marginX={theme.spacing(5)}
            >
                <Title>Clients</Title>
            </Box>
            <ClientList
                connectionRequests={connectionRequests}
                designation={designation}
                onViewMemberDetails={setMemberDetails}
                onAcceptConnectionRequest={(connectionRequest) =>
                    setConfirmationConnectionRequest({
                        action: 'accept',
                        connectionRequest,
                    })
                }
                onDeclineConnectionRequest={(connectionRequest) =>
                    setConfirmationConnectionRequest({
                        action: 'decline',
                        connectionRequest,
                    })
                }
                onTerminateConnectionRequest={(connectionRequest) =>
                    setConfirmationConnectionRequest({
                        action: 'terminate',
                        connectionRequest,
                    })
                }
                onOpenChat={(memberId) =>
                    console.log('TODO: Open chat with member', memberId)
                }
                onReimbursmentRequest={(connectionRequest) =>
                    window?.open(
                        formatReimbursementRequestUrl(
                            REIMBURSEMENT_REQUEST_URL,
                            connectionRequest
                        ),
                        '_blank'
                    )
                }
            />
            {memberDetails && (
                <MemberDetailsModal
                    connectionRequest={memberDetails}
                    onClose={() => setMemberDetails(undefined)}
                />
            )}
            {confirmationConnectionRequest && (
                <ActionConfirmationModal
                    action={confirmationConnectionRequest.action}
                    connectionRequest={
                        confirmationConnectionRequest.connectionRequest
                    }
                    isLoading={isUpdatingConnectionRequestStatus}
                    onClose={() => setConfirmationConnectionRequest(undefined)}
                    onPrimaryButtonClick={(message) =>
                        handleUpdateConnectionRequest({
                            ...confirmationConnectionRequest,
                            message,
                        })
                    }
                />
            )}
        </PageContainer>
    );
}

const PageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
}));
