import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    H1,
    Button,
    List,
    Paragraph,
    Badge,
    BADGE_COLOR,
    BADGE_SIZE,
    ListItem,
    FloatingList,
} from '@/lib/shared/components/ui';
import { ProviderClientDetailsPageProps } from '../../../service/page-props/get-client-details-page-props';
import { format } from 'date-fns';
import { SessionInvoiceStatus } from '@prisma/client';
import { MoneyOff } from '@mui/icons-material';

interface ClientDetailsProps {
    memberDetails: ProviderClientDetailsPageProps['memberDetails'];
    provider: ProviderClientDetailsPageProps['user'];
    invoices: ProviderClientDetailsPageProps['invoices'];
    onCreateInvoice?: () => void;
    onVoidInvoice: (
        invoice: ProviderClientDetailsPageProps['invoices'][number]
    ) => void;
}
export const ClientDetails = ({
    memberDetails,
    invoices,
    onCreateInvoice,
    onVoidInvoice,
}: ClientDetailsProps) => {
    const canBeVoided = (status: string) => {
        const voidableStatuses: string[] = [
            SessionInvoiceStatus.draft,
            SessionInvoiceStatus.open,
        ];
        return !voidableStatuses.includes(status);
    };
    return (
        <PageContainer>
            <TitleContainer>
                <Title>
                    {memberDetails.givenName} {memberDetails.surname}
                </Title>
                <Box>
                    {onCreateInvoice && (
                        <Button onClick={onCreateInvoice}>
                            Send Session Invoice
                        </Button>
                    )}
                </Box>
            </TitleContainer>
            <Container>
                <List style={{ width: '100%' }}>
                    <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                        <LineItemContent>
                            <Paragraph bold noMargin>
                                Invoice
                            </Paragraph>
                            <Box width={'25%'}>
                                <Paragraph bold noMargin>
                                    Status
                                </Paragraph>
                            </Box>
                        </LineItemContent>
                    </ListItem>
                    {invoices.map((invoice) => (
                        <ListItem key={invoice.id}>
                            <LineItemContent>
                                <Paragraph bold noMargin>
                                    Mental Health Coaching Session{' '}
                                    {invoice.dateOfSession
                                        ? 'on ' +
                                          format(
                                              new Date(invoice.dateOfSession),
                                              'MMMM do, yyyy'
                                          )
                                        : ''}
                                </Paragraph>
                                <Box className="invoice-status">
                                    {getBadge(invoice.status)}
                                    <FloatingList
                                        sx={{ marginLeft: 2 }}
                                        // headerSlot={
                                        //     isPending &&
                                        //     isSmallScreen && (
                                        //         <Badge
                                        //             color={BADGE_COLOR.WARNING}
                                        //             icon={<PendingOutlined />}
                                        //             size={BADGE_SIZE.SMALL}
                                        //         >
                                        //             Pending
                                        //         </Badge>
                                        //     )
                                        // }
                                        listItems={[
                                            {
                                                disabled: canBeVoided(
                                                    invoice.status
                                                ),
                                                title: canBeVoided(
                                                    invoice.status
                                                )
                                                    ? 'The invoice is not voidable in its current state'
                                                    : 'The invoice will no longer be available for payment.',
                                                text: 'Void Invoice',
                                                icon: <MoneyOff />,
                                                onClick: () =>
                                                    onVoidInvoice(invoice),
                                            },
                                        ]}
                                    />
                                </Box>
                            </LineItemContent>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </PageContainer>
    );
};

const getBadge = (status: SessionInvoiceStatus) => {
    let badgeColor: (typeof BADGE_COLOR)[keyof typeof BADGE_COLOR] =
        BADGE_COLOR.WARNING;
    let badgeText = 'Awaiting Payment';
    switch (status) {
        case SessionInvoiceStatus.paid:
            badgeColor = BADGE_COLOR.SUCCESS;
            badgeText = 'Paid';
            break;
        case SessionInvoiceStatus.uncollectible:
            badgeColor = BADGE_COLOR.ERROR;
            badgeText = 'Uncollectible';
            break;
        case SessionInvoiceStatus.void:
            badgeColor = BADGE_COLOR.NEUTRAL_LIGHT;
            badgeText = 'Voided';
            break;
        case SessionInvoiceStatus.draft:
            badgeColor = BADGE_COLOR.NEUTRAL_LIGHT;
            badgeText = 'Draft';
            break;
        case SessionInvoiceStatus.open:
        default:
            break;
    }

    return (
        <Badge color={badgeColor} size={BADGE_SIZE.SMALL}>
            {badgeText}
        </Badge>
    );
};

const PageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    margin: 0,
}));
const Container = styled(Box)(({ theme }) => ({
    margin: theme.spacing(6, 6),
}));
const TitleContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const LineItemContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& >:first-child': {
        flex: 1,
    },
    '& .invoice-status': {
        width: '25%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
