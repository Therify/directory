import { useState } from 'react';
import { ConnectionRequest, TherifyUser } from '@/lib/shared/types';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { formatReimbursementRequestUrl } from '@/lib/shared/utils';
import {
    ActionConfirmationModal,
    ClientList,
    MemberDetailsModal,
    ReimbursementModal,
} from '@/lib/modules/providers/components/Clients';
import { useProviderConnectionRequests } from '@/lib/modules/providers/components/hooks';
import { H1 } from '@/lib/shared/components/ui';
import { ProfileType } from '@prisma/client';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;

interface ProviderClientListPageProps {
    baseConnectionRequests: ConnectionRequest.Type[];
    designation: ProfileType;
    user: TherifyUser.TherifyUser;
    onInvoiceClient?: (connectionRequest: ConnectionRequest.Type) => void;
}

export function ProviderClientListPage({
    baseConnectionRequests,
    designation,
    user,
    onInvoiceClient,
}: ProviderClientListPageProps) {
    const theme = useTheme();
    const router = useRouter();
    const { flags } = useFeatureFlags(user);
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
    const [reimbursementDetails, setReimbursementDetails] =
        useState<ConnectionRequest.Type>();
    const handleClientSelect = (cr: ConnectionRequest.Type) =>
        router.push(
            `${URL_PATHS.PROVIDERS.COACH.CLIENTS}/${cr.member.id.replace(
                'auth0|',
                ''
            )}`
        );

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
                onClientSelect={
                    designation === ProfileType.coach &&
                    user.stripeConnectAccountId
                        ? handleClientSelect
                        : setMemberDetails
                }
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
                onInvoiceClient={onInvoiceClient}
                onReimbursmentRequest={(connectionRequest) => {
                    if (flags.useIframeReimbursementRequest) {
                        setReimbursementDetails(connectionRequest);
                        return;
                    }
                    window?.open(
                        formatReimbursementRequestUrl({
                            baseUrl: REIMBURSEMENT_REQUEST_URL,
                            connectionRequest,
                            designation,
                        }),
                        '_blank'
                    );
                }}
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

            {reimbursementDetails && (
                <ReimbursementModal
                    designation={designation}
                    connectionRequest={reimbursementDetails}
                    onClose={() => setReimbursementDetails(undefined)}
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
