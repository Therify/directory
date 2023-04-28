import { Box, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    H1,
    Button,
    List,
    Paragraph,
    Badge,
    BADGE_COLOR,
    BADGE_SIZE,
    BUTTON_SIZE,
    ListItem,
    FloatingList,
} from '@/lib/shared/components/ui';
import { ProviderClientDetailsPageProps } from '../../../service/page-props/get-client-details-page-props';
import { format } from 'date-fns';
import { SessionInvoiceStatus } from '@prisma/client';
import { ChevronLeft, MoneyOff } from '@mui/icons-material';
import { URL_PATHS } from '@/lib/sitemap';

interface ClientDetailsProps {
    memberDetails: ProviderClientDetailsPageProps['memberDetails'];
    provider: ProviderClientDetailsPageProps['user'];
    invoices: ProviderClientDetailsPageProps['invoices'];
    onBack?: () => void;
    onCreateInvoice?: () => void;
    onVoidInvoice: (
        invoice: ProviderClientDetailsPageProps['invoices'][number]
    ) => void;
}
export const ClientDetails = ({
    memberDetails,
    provider,
    invoices,
    onBack,
    onCreateInvoice,
    onVoidInvoice,
}: ClientDetailsProps) => {
    const theme = useTheme();
    const canBeVoided = (status: string) => {
        const voidableStatuses: string[] = [
            SessionInvoiceStatus.draft,
            SessionInvoiceStatus.open,
        ];
        return !voidableStatuses.includes(status);
    };
    return (
        <PageContainer>
            {onBack && (
                <Button
                    size={BUTTON_SIZE.SMALL}
                    color="info"
                    type="text"
                    onClick={onBack}
                    startIcon={<ChevronLeft />}
                    style={{ margin: theme.spacing(6, 0, 0, 2) }}
                >
                    Back
                </Button>
            )}
            <TitleContainer
                style={{
                    marginTop: theme.spacing(onBack ? 4 : 6),
                }}
            >
                <Title>
                    {memberDetails.givenName} {memberDetails.surname}
                </Title>
                <Box>
                    {onCreateInvoice && provider.stripeConnectAccountId && (
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
                            <Paragraph className="invoice-status" bold noMargin>
                                Status
                            </Paragraph>
                        </LineItemContent>
                    </ListItem>
                    {!provider.stripeConnectAccountId && (
                        <Paragraph marginTop={4}>
                            You must have a Therify Stripe Connect account to
                            send invoices to your clients. Please visit your{' '}
                            <Link href={URL_PATHS.PROVIDERS.COACH.PAYMENTS}>
                                payments page
                            </Link>{' '}
                            to sign up for a Stripe Connect account.
                        </Paragraph>
                    )}
                    {invoices.map((invoice) => (
                        <ListItem key={invoice.id}>
                            <LineItemContent>
                                <Box>
                                    <Paragraph bold noMargin>
                                        Mental Health Coaching Session{' '}
                                        {invoice.dateOfSession
                                            ? 'on ' +
                                              format(
                                                  new Date(
                                                      invoice.dateOfSession
                                                  ),
                                                  'MMMM do, yyyy'
                                              )
                                            : ''}
                                    </Paragraph>
                                    <MobileBadge>
                                        {getBadge(invoice.status)}
                                    </MobileBadge>
                                </Box>
                                <Box className="invoice-status">
                                    <DesktopBadge>
                                        {getBadge(invoice.status)}
                                    </DesktopBadge>
                                    <FloatingList
                                        sx={{
                                            marginLeft: 2,
                                            '& button': {
                                                width: '60px',
                                                height: '60px',
                                                padding: 0,
                                            },
                                        }}
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
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            width: '25%',
        },
    },
    '& p.invoice-status': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
}));

const MobileBadge = styled(Box)(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));
const DesktopBadge = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));
