import { Control, useController } from 'react-hook-form';
import {
    Box,
    FormControlLabel,
    Link,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import {
    H1,
    H2,
    H3,
    Paragraph,
    Subhead,
    Caption,
    Toggle,
    Divider,
} from '@/lib/shared/components/ui';
import {
    AccountNameInput,
    CoveredSessionsInput,
    BillingCycleButtons,
    SeatCountInput,
} from './components/inputs';
import { SafeAccountDetails } from './hooks';
import { useState } from 'react';

function calculatePrice({
    seats,
    coveredSessions,
    billingCycle,
}: {
    seats: number;
    coveredSessions: number;
    billingCycle: 'month' | 'biannual' | 'annual';
}): number {
    console.log({ seats, coveredSessions, billingCycle });
    const isIndividual = seats === 1;
    const isTeam = seats > 1;
    const hasCoveredSessions = coveredSessions > 0;
    const COVERED_SESSION_ADDON = hasCoveredSessions ? 70 * coveredSessions : 0;
    if (isIndividual) {
        const MONTHLY_SEAT_COST = 19;
        const BIANNUAL_SEAT_COST = 16;
        const ANNUAL_SEAT_COST = 14;
        switch (billingCycle) {
            case 'month':
                return MONTHLY_SEAT_COST + COVERED_SESSION_ADDON;
            case 'biannual':
                return BIANNUAL_SEAT_COST * 6 + COVERED_SESSION_ADDON;
            case 'annual':
                return ANNUAL_SEAT_COST * 12 + COVERED_SESSION_ADDON;
        }
    }
    if (isTeam) {
        const BIANNUAL_SEAT_COST = 11;
        const ANNUAL_SEAT_COST = 10;
        switch (billingCycle) {
            case 'biannual':
                return (
                    BIANNUAL_SEAT_COST * 6 * seats +
                    COVERED_SESSION_ADDON * seats
                );
            case 'annual':
                return (
                    ANNUAL_SEAT_COST * 12 * seats +
                    COVERED_SESSION_ADDON * seats
                );
            default:
                return 0;
        }
    }
    return 0;
}

function formatBillingCycle(billingCycle: 'month' | 'biannual' | 'annual') {
    switch (billingCycle) {
        case 'month':
            return 'Monthly';
        case 'biannual':
            return 'Every 6 months';
        case 'annual':
            return 'Every 12 months';
    }
}
function formatPrice(price: number) {
    return `$${price.toFixed(2)}`;
}

function calculateSeatTotal({
    isTeamAccount,
    seats,
    billingCycle,
}: {
    isTeamAccount: boolean;
    seats: number;
    billingCycle: 'month' | 'biannual' | 'annual';
}) {
    if (isTeamAccount) {
        const BIANNUAL_SEAT_COST = 11;
        const ANNUAL_SEAT_COST = 10;
        switch (billingCycle) {
            case 'biannual':
                return BIANNUAL_SEAT_COST * 6 * seats;
            case 'annual':
                return ANNUAL_SEAT_COST * 12 * seats;
            default:
                return 0;
        }
    }
    return 0;
}

function calculateCoveredSessionsTotal({
    coveredSessions,
}: {
    coveredSessions: number;
}) {
    return coveredSessions * 70;
}
export interface AccountDetailsFormProps {
    defaultValues?: Partial<SafeAccountDetails>;
    control: Control<HandleAccountOnboarding.Input>;
    minimumSeats?: number;
    maximumSeats?: number;
    sessionPrice: number;
    seatPrice: number;
    seatCount: number;
    billingCycle: HandleAccountOnboarding.Input['billingCycle'];
    coveredSessions: number;
    minCoveredSessions?: number;
    maxCoveredSessions?: number;
    disabled?: boolean;
    onInputBlur: () => void;
}

export const AccountDetailsForm = ({
    defaultValues,
    control,
    minimumSeats = 1,
    maximumSeats = 50,
    seatCount,
    billingCycle,
    coveredSessions = 0,
    minCoveredSessions = 1,
    maxCoveredSessions = 10,
    disabled,
    onInputBlur,
}: AccountDetailsFormProps) => {
    const theme = useTheme();
    if (!control) throw new Error('control is required');
    const [wantsCoveredSessions, setWantsCoveredSessions] = useState(false);
    const [isTeamAccount, setIsTeamAccount] = useState(false);
    const { field: planType } = useController({
        control,
        name: 'planType',
    });
    const { field: accountNameField } = useController({
        control,
        name: 'name',
    });
    const { field: coveredSessionField } = useController({
        control,
        name: 'coveredSessions',
    });
    const { field: billingCycleField } = useController({
        control,
        name: 'billingCycle',
    });
    const { field: seatCountField } = useController({
        control,
        name: 'seatCount',
    });
    return (
        <Box width="100%">
            <Header>Almost done! Just a few more details.</Header>
            <Form onSubmit={(e) => e.preventDefault()}>
                {isTeamAccount && (
                    <AccountNameInput
                        control={control}
                        defaultValue={defaultValues?.name}
                        onInputBlur={onInputBlur}
                        disabled={disabled}
                    />
                )}
                <Stack spacing={8}>
                    <Stack>
                        <Paragraph>
                            Would you also like to have covered sessions?
                        </Paragraph>
                        <RadioGroup
                            onChange={(e) => {
                                const selectedCoveredSessions =
                                    e.target.value === 'yes';
                                setWantsCoveredSessions(
                                    selectedCoveredSessions
                                );
                                coveredSessionField.onChange(
                                    selectedCoveredSessions === true ? 1 : 0
                                );
                            }}
                            defaultValue={'no'}
                            defaultChecked
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            <FormControlLabel
                                value={'yes'}
                                control={<Radio />}
                                label="Yes"
                                itemType="https://schema.org/Boolean"
                                sx={{
                                    flex: 1,
                                }}
                            />
                            <FormControlLabel
                                value={'no'}
                                control={<Radio />}
                                label="No"
                                itemType="https://schema.org/Boolean"
                                sx={{
                                    flex: 1,
                                }}
                            />
                        </RadioGroup>
                        {wantsCoveredSessions && (
                            <>
                                <SectionTitle>
                                    How many covered sessions would you like?
                                </SectionTitle>
                                <Subhead textAlign="center">
                                    {coveredSessions}
                                </Subhead>
                                <Box
                                    display="flex"
                                    width="100%"
                                    marginRight={4}
                                >
                                    <Paragraph>{minCoveredSessions}</Paragraph>
                                    <CoveredSessionsInput
                                        control={control}
                                        max={maxCoveredSessions}
                                        min={minCoveredSessions}
                                        onInputBlur={onInputBlur}
                                        disabled={disabled}
                                    />
                                    <Paragraph>{maxCoveredSessions}</Paragraph>
                                </Box>
                            </>
                        )}
                    </Stack>
                    <Stack>
                        <Paragraph>Are you buying a team account?</Paragraph>
                        <RadioGroup
                            defaultChecked
                            defaultValue={'no'}
                            onChange={(e) => {
                                const selectedTeamAccount =
                                    e.target.value === 'yes';
                                setIsTeamAccount(selectedTeamAccount);
                                if (selectedTeamAccount) {
                                    seatCountField.onChange(2);
                                    billingCycleField.onChange('biannual');
                                    accountNameField.onChange('');
                                    planType.onChange('team');
                                } else {
                                    seatCountField.onChange(1);
                                    planType.onChange('individual');
                                    billingCycleField.onChange('month');
                                    accountNameField.onChange(
                                        defaultValues?.name
                                    );
                                }
                            }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <FormControlLabel
                                value={'yes'}
                                control={<Radio />}
                                label="Yes"
                                itemType="https://schema.org/Boolean"
                                sx={{
                                    flex: 1,
                                }}
                            />
                            <FormControlLabel
                                value={'no'}
                                control={<Radio />}
                                label="No"
                                itemType="https://schema.org/Boolean"
                                sx={{
                                    flex: 1,
                                }}
                            />
                        </RadioGroup>
                        {billingCycle !== 'month' && isTeamAccount && (
                            <>
                                {' '}
                                <SectionTitle>
                                    How many seats would you like to purchase?
                                </SectionTitle>
                                <Subhead textAlign="center">
                                    {seatCount}
                                </Subhead>
                                <Box
                                    display="flex"
                                    width="100%"
                                    marginRight={4}
                                >
                                    <Paragraph>{2}</Paragraph>
                                    <SeatCountInput
                                        control={control}
                                        max={maximumSeats}
                                        defaultValue={minimumSeats}
                                        min={isTeamAccount ? 2 : 1}
                                        onInputBlur={onInputBlur}
                                        disabled={disabled}
                                    />
                                    <Paragraph>{maximumSeats}</Paragraph>
                                </Box>
                            </>
                        )}
                    </Stack>
                </Stack>
                <SectionTitle>
                    How would you like to be billed for your Therify
                    subscription?
                </SectionTitle>
                <BillingCycleButtons
                    control={control}
                    defaultValue={'month'}
                    disabled={disabled}
                    isTeamAccount={isTeamAccount}
                />
                <>
                    <Divider sx={{ margin: `40px 0` }} />
                    <SectionTitle>Your plan summary:</SectionTitle>
                    <>
                        {isTeamAccount && (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <b>{seatCount}</b> seats:
                                    </Box>{' '}
                                    <Box sx={{ fontWeight: 'bold' }}>
                                        $
                                        {calculateSeatTotal({
                                            seats: seatCount,
                                            billingCycle,
                                            isTeamAccount,
                                        })}
                                    </Box>
                                </Box>
                                <Divider />
                            </>
                        )}
                        {wantsCoveredSessions && (
                            <>
                                <Paragraph
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <b>{coveredSessions}</b> covered
                                        sessions:
                                    </Box>
                                    <Box sx={{ fontWeight: 'bold' }}>
                                        $
                                        {calculateCoveredSessionsTotal({
                                            coveredSessions,
                                        })}{' '}
                                        {isTeamAccount && '/seat'}
                                    </Box>
                                </Paragraph>
                                <Divider />
                            </>
                        )}
                    </>
                    <Stack
                        direction="row"
                        sx={{
                            flexDirection: 'column-reverse',
                            alignItems: 'flex-end',
                        }}
                    >
                        <H3 sx={{ textAlign: 'right' }}>
                            $
                            {calculatePrice({
                                coveredSessions,
                                seats: seatCount,
                                billingCycle,
                            })}{' '}
                        </H3>
                        <Caption>{formatBillingCycle(billingCycle)}</Caption>
                    </Stack>
                    {seatCount === maximumSeats && (
                        <Paragraph>
                            Need more than {maximumSeats} seats?{' '}
                            <Link>Contact us</Link> about our enterprise
                            pricing.
                        </Paragraph>
                    )}
                </>
                <Paragraph marginTop={4}>
                    Therify partners with{' '}
                    <b>
                        <Link
                            href="https://stripe.com/"
                            target="_blank"
                            style={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            Stripe
                        </Link>{' '}
                    </b>
                    for simplified billing. You will be redirected to
                    Stripe&apos;s checkout experience.
                </Paragraph>
            </Form>
        </Box>
    );
};

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    '& > *': {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            '&:last-child': {
                width: '100%',
            },
        },
    },
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    width: '75%',
}));
const SectionTitle = styled(H2)(({ theme }) => ({
    ...theme.typography.h6,
    marginTop: theme.spacing(8),
}));
