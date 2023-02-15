import { PracticeClientsPageProps } from '@/lib/modules/providers/service/page-props/get-practice-clients-page-props/getPracticeClientsPageProps';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { FloatingList } from '../../../ui/FloatingList';
import { List } from '../../../ui/List';
import { H1 } from '../../../ui/Typography/Headers';
import { Paragraph } from '../../../ui/Typography/Paragraph';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;
const CLIENT_LIST_ACTIONS = ['Reimbursement Request'] as const;
type ConnectionRequestItem =
    PracticeClientsPageProps['connectionRequests'][number];

const paramMap = {
    'clientname[first]': 'memberFirstName',
    'clientname[last]': 'memberLastName',
    clientemail: 'memberEmailAddress',
    clientstate: 'memberState',
    clientemployer: 'memberAccountName',
    'providername[first]': 'providerFirstName',
    'providername[last]': 'providerLastName',
    provideremail: 'practiceEmailAddress',
    billingemail: 'practiceEmailAddress',
    practice: 'practiceName',
};

function formatReimbursementRequestURL(client: ConnectionRequestItem) {
    return (
        REIMBURSEMENT_REQUEST_URL +
        Object.keys(paramMap)
            .map(
                (key) =>
                    `${key}=${
                        // @ts-ignore
                        client[paramMap[key] as keyof ConnectionRequestItem]
                    }`
            )
            .join('&')
    );
}

export function PracticeClientListPage({
    connectionRequests,
}: PracticeClientsPageProps) {
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
                                key={connectionRequest.memberId}
                                sx={{ width: '100%' }}
                            >
                                <ClientListItemContainer>
                                    <MemberName>
                                        {connectionRequest.memberFirstName}{' '}
                                        {connectionRequest.memberLastName}
                                    </MemberName>
                                    <MemberEmailAddress>
                                        {connectionRequest.memberEmailAddress}
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
                                                            formatReimbursementRequestURL(
                                                                connectionRequest
                                                            )
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

const MemberEmailAddress = styled(Paragraph)(({ theme }) => ({
    flex: 1,
}));

/* ------------------------------- Formatters ------------------------------- */
