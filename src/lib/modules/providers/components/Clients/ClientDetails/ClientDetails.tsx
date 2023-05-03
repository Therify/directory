import { useState } from 'react';
import { format } from 'date-fns';
import { ProfileType, SessionInvoiceStatus } from '@prisma/client';
import { Box, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { URL_PATHS } from '@/lib/sitemap';
import {
    H1,
    H3,
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
import {
    ChevronLeft,
    MoneyOff,
    LocationOnOutlined,
    CorporateFareRounded,
    PaymentOutlined,
    RequestQuoteOutlined,
    HealthAndSafetyOutlined,
    EmailOutlined,
} from '@mui/icons-material';
import { ProfileDetails } from './ui';
import { ReimbursementModal } from '../ReimbursementModal';

interface ClientDetailsProps {
    designation: ProfileType;
    connectionRequest: ProviderClientDetailsPageProps['connectionRequest'];
    provider: ProviderClientDetailsPageProps['user'];
    invoices: ProviderClientDetailsPageProps['invoices'];
    onBack?: () => void;
    onCreateInvoice?: () => void;
    onVoidInvoice: (
        invoice: ProviderClientDetailsPageProps['invoices'][number]
    ) => void;
}
export const ClientDetails = ({
    connectionRequest,
    designation,
    provider,
    invoices,
    onBack,
    onCreateInvoice,
    onVoidInvoice,
}: ClientDetailsProps) => {
    const theme = useTheme();
    const [isReimbursementModalOpen, setIsReimbursementModalOpen] =
        useState(false);
    const canBeVoided = (status: string) => {
        const voidableStatuses: string[] = [
            SessionInvoiceStatus.draft,
            SessionInvoiceStatus.open,
        ];
        return !voidableStatuses.includes(status);
    };
    const hasSessionsRemaining =
        (connectionRequest.member.plan?.coveredSessions ?? 0) -
            (connectionRequest.member.plan?.remainingSessions ?? 0) >
        0;
    const openEmail = (address: string) => {
        if (typeof window !== 'undefined')
            window.open(`mailto:${address}`, '_blank');
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
                <Box>
                    <Title>
                        {connectionRequest.member.givenName}{' '}
                        {connectionRequest.member.surname}
                    </Title>
                    <Box>
                        <Box display="flex" flexWrap="wrap">
                            <IconContainer title="Organization name">
                                <CorporateFareRounded color="info" />
                                <Paragraph size="small">
                                    {connectionRequest.member.account.name}
                                </Paragraph>
                            </IconContainer>
                            <IconContainer title="Member's location">
                                <LocationOnOutlined color="info" />
                                <Paragraph size="small">
                                    {
                                        connectionRequest.member.memberProfile
                                            .state
                                    }
                                    ,{' '}
                                    {
                                        connectionRequest.member.memberProfile
                                            .country
                                    }
                                </Paragraph>
                            </IconContainer>
                        </Box>
                        <Box display="flex" flexWrap="wrap">
                            <IconContainer title="Member's insurance benefit">
                                <HealthAndSafetyOutlined color="info" />
                                <Paragraph size="small">
                                    {
                                        connectionRequest.member.memberProfile
                                            .insurance
                                    }
                                </Paragraph>
                            </IconContainer>
                        </Box>
                    </Box>
                </Box>
                <ButtonsContainer>
                    {!hasSessionsRemaining &&
                        onCreateInvoice &&
                        provider.stripeConnectAccountId && (
                            <Button
                                onClick={onCreateInvoice}
                                endIcon={<PaymentOutlined />}
                            >
                                Send Session Invoice
                            </Button>
                        )}
                    {hasSessionsRemaining && (
                        <Button
                            endIcon={<RequestQuoteOutlined />}
                            onClick={() => setIsReimbursementModalOpen(true)}
                        >
                            Submit Reimbursement Request
                        </Button>
                    )}
                </ButtonsContainer>
            </TitleContainer>
            <Container>
                <ProfileDetails {...connectionRequest.member} />
            </Container>
            <EmailButton
                type="outlined"
                color="info"
                startIcon={<EmailOutlined />}
                onClick={() => openEmail(connectionRequest.member.emailAddress)}
            >
                Email
            </EmailButton>

            <Container style={{ margin: 0 }}>
                <List style={{ width: '100%' }}>
                    <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                        <LineItemContent>
                            <InvoiceTitle>Invoices</InvoiceTitle>
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
                    {provider.stripeConnectAccountId &&
                        invoices.length === 0 && (
                            <Paragraph marginTop={4}>
                                No invoices have been created for this client.
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
            {isReimbursementModalOpen && (
                <ReimbursementModal
                    designation={designation}
                    connectionRequest={connectionRequest}
                    onClose={() => setIsReimbursementModalOpen(false)}
                />
            )}
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

const ButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(4),
    '& button': {
        flex: 1,
        width: '100%',
        marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
        width: 'auto',
        marginTop: 0,
        flexDirection: 'column',
        '& button': {
            marginBottom: theme.spacing(2),
        },
    },
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h2,
}));
const InvoiceTitle = styled(H3)(({ theme }) => ({
    ...theme.typography.h5,
}));
const Container = styled(Box)(({ theme }) => ({
    margin: theme.spacing(6, 6),
}));
const EmailButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 6),
    [theme.breakpoints.up('md')]: {
        margin: theme.spacing(6, 6),
    },
}));
const TitleContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
}));

const IconContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    '& svg': {
        marginRight: theme.spacing(2),
        alignItems: 'center',
        color: theme.palette.text.secondary,
    },
    '& p': {
        margin: 0,
        color: theme.palette.text.secondary,
    },
    '&:last-of-type': {
        marginBottom: 0,
    },
}));

const LineItemContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& > h3': {
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
