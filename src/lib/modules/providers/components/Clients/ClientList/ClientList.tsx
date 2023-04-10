import { ConnectionRequest } from '@/lib/shared/types';
import { Box, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { List, Paragraph, Caption, ListItem } from '@/lib/shared/components/ui';
import { CellContainer, ClientListItem, ClientListItemContainer } from './ui';
import { ProfileType } from '@prisma/client';

type HandleConnectionRequestAction = (
    connectionRequest: ConnectionRequest.Type
) => void;

interface ClientListProps {
    designation: ProfileType;
    connectionRequests: ConnectionRequest.Type[];
    onAcceptConnectionRequest: HandleConnectionRequestAction;
    onDeclineConnectionRequest: HandleConnectionRequestAction;
    onTerminateConnectionRequest: HandleConnectionRequestAction;
    onReimbursmentRequest: HandleConnectionRequestAction;
    onViewMemberDetails: HandleConnectionRequestAction;
    onInvoiceClient?: HandleConnectionRequestAction;
}

export const ClientList = ({
    connectionRequests,
    onAcceptConnectionRequest,
    onDeclineConnectionRequest,
    onTerminateConnectionRequest,
    onReimbursmentRequest,
    onViewMemberDetails,
    onInvoiceClient,
}: ClientListProps) => {
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const hasConnectionRequests = connectionRequests.length > 0;
    return (
        <ClientListContainer>
            <ListItem sx={{ width: '100%', '& > div': { paddingY: 0 } }}>
                <ClientListItemContainer paddingBottom={0}>
                    <CellContainer>
                        <Caption margin={0}>Name</Caption>
                    </CellContainer>
                    <CellContainer>
                        <Caption margin={0}>Email</Caption>
                    </CellContainer>
                    <CellContainer>
                        <Caption margin={0}>Account</Caption>
                    </CellContainer>
                    <CellContainer></CellContainer>
                </ClientListItemContainer>
            </ListItem>
            {!hasConnectionRequests && (
                <Box margin={5}>
                    <Paragraph color="text-secondary">
                        No clients to show. Your future referrals will appear
                        here.
                    </Paragraph>
                </Box>
            )}
            {connectionRequests.map((connectionRequest) => {
                return (
                    <ClientListItem
                        key={connectionRequest.member.id}
                        isSmallScreen={isSmallScreen}
                        connectionRequest={connectionRequest}
                        onAccept={() =>
                            onAcceptConnectionRequest(connectionRequest)
                        }
                        onDecline={() =>
                            onDeclineConnectionRequest(connectionRequest)
                        }
                        onTerminate={() =>
                            onTerminateConnectionRequest(connectionRequest)
                        }
                        onView={() => onViewMemberDetails(connectionRequest)}
                        onInvoiceClient={
                            onInvoiceClient
                                ? () => onInvoiceClient(connectionRequest)
                                : undefined
                        }
                        onReimbursmentRequest={() => {
                            onReimbursmentRequest(connectionRequest);
                        }}
                    />
                );
            })}
        </ClientListContainer>
    );
};

const ClientListContainer = styled(List)(({ theme }) => ({
    width: '100%',
}));
