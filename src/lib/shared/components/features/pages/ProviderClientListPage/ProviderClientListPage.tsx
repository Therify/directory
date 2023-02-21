import { useState } from 'react';
import { ConnectionRequest } from '@/lib/shared/types';
import { ListItem, Stack, Link, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatReimbursementRequestUrl } from '@/lib/shared/utils';
import { List, H1, Paragraph, FloatingList } from '@/lib/shared/components/ui';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;

const CLIENT_LIST_ACTIONS = ['Reimbursement Request'] as const;

interface ProviderClientListPageProps {
    connectionRequests: ConnectionRequest.Type[];
}

export function ProviderClientListPage({
    connectionRequests,
}: ProviderClientListPageProps) {
    const hasConnectionRequests = connectionRequests.length > 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <PageContainer>
            <Title>Clients</Title>
            {!hasConnectionRequests && (
                <Paragraph>Your new referrals will appear here!</Paragraph>
            )}
            {hasConnectionRequests && (
                <ClientList>
                    {connectionRequests.map((connectionRequest) => {
                        return (
                            <ListItem
                                key={connectionRequest.member.id}
                                sx={{ width: '100%' }}
                            >
                                <ClientListItemContainer>
                                    <MemberName>
                                        {connectionRequest.member.givenName}{' '}
                                        {connectionRequest.member.surname}
                                    </MemberName>
                                    <MemberEmailAddress
                                        href={`mailto:${connectionRequest.member.emailAddress}`}
                                    >
                                        {connectionRequest.member.emailAddress}
                                    </MemberEmailAddress>
                                    <FloatingList
                                        listItems={CLIENT_LIST_ACTIONS.map(
                                            (action) => ({
                                                text: action,
                                                onClick: () => {
                                                    if (
                                                        action ===
                                                        'Reimbursement Request'
                                                    ) {
                                                        window.open(
                                                            formatReimbursementRequestUrl(
                                                                REIMBURSEMENT_REQUEST_URL,
                                                                connectionRequest
                                                            ),
                                                            '_blank'
                                                        );
                                                    }
                                                },
                                            })
                                        )}
                                    />
                                </ClientListItemContainer>
                            </ListItem>
                        );
                    })}
                </ClientList>
            )}
        </PageContainer>
    );
}

/* ---------------------------- Styled components --------------------------- */

const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10),
    width: '100%',
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    marginBottom: theme.spacing(1),
}));

const ClientList = styled(List)(({ theme }) => ({
    width: '100%',
}));

const ClientListItemContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
}));

const MemberName = styled(Paragraph)(({ theme }) => ({
    fontWeight: 'bold',
    width: '25%',
}));

const MemberEmailAddress = styled(Link)(({ theme }) => ({
    ...theme.typography.body2,
    flex: 1,
}));
