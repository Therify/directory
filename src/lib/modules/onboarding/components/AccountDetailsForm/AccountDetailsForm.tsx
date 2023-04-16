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
    Divider,
} from '@/lib/shared/components/ui';
import {
    AccountNameInput,
    CoveredSessionsInput,
    BillingCycleButtons,
    SeatCountInput,
} from './components/inputs';
import { SafeAccountDetails } from './hooks';
const COVERED_SESSION_PRICE = 70;
const SEAT_PRICING = {
    INDIVIDUAL: {
        MONTHLY: 19,
        BIANNUAL: 16,
        ANNUAL: 15,
    },
    TEAM: {
        BIANNUAL: 11,
        ANNUAL: 10,
    },
} as const;

function calculatePrice({
    seats,
    coveredSessions,
    billingCycle,
}: {
    seats: number;
    coveredSessions: number;
    billingCycle: 'month' | 'biannual' | 'annual';
}): number {
    const isIndividual = seats === 1;
    const isTeam = seats > 1;
    const hasCoveredSessions = coveredSessions > 0;
    const COVERED_SESSION_ADDON = hasCoveredSessions
        ? COVERED_SESSION_PRICE * coveredSessions
        : 0;
    if (isIndividual) {
        switch (billingCycle) {
            case 'month':
                return SEAT_PRICING.INDIVIDUAL.MONTHLY + COVERED_SESSION_ADDON;
            case 'biannual':
                return (
                    SEAT_PRICING.INDIVIDUAL.BIANNUAL * 6 + COVERED_SESSION_ADDON
                );
            case 'annual':
                return (
                    SEAT_PRICING.INDIVIDUAL.ANNUAL * 12 + COVERED_SESSION_ADDON
                );
        }
    }
    if (isTeam) {
        switch (billingCycle) {
            case 'biannual':
                return (
                    SEAT_PRICING.TEAM.BIANNUAL * 6 * seats +
                    COVERED_SESSION_ADDON * seats
                );
            case 'annual':
                return (
                    SEAT_PRICING.TEAM.ANNUAL * 12 * seats +
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

function renderBillingCycle(billingCycle: 'month' | 'biannual' | 'annual') {
    switch (billingCycle) {
        case 'month':
            return 'per month';
        case 'biannual':
            return 'per 6 months';
        case 'annual':
            return 'per year';
    }
}

function renderCoveredSessionPrompt({
    isTeam,
    billingCycle,
}: {
    isTeam: boolean;
    billingCycle: 'month' | 'biannual' | 'annual';
}) {
    if (isTeam) {
        return `How many sessions would you like to cover per employee, ${renderBillingCycle(
            billingCycle
        )}?`;
    }
    return `How many sessions would you like to have ${renderBillingCycle(
        billingCycle
    )}?`;
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
        switch (billingCycle) {
            case 'biannual':
                return SEAT_PRICING.TEAM.BIANNUAL * 6 * seats;
            case 'annual':
                return SEAT_PRICING.TEAM.ANNUAL * 12 * seats;
            default:
                return 0;
        }
    }
    switch (billingCycle) {
        case 'month':
            return SEAT_PRICING.INDIVIDUAL.MONTHLY;
        case 'biannual':
            return SEAT_PRICING.INDIVIDUAL.BIANNUAL * 6;
        case 'annual':
            return SEAT_PRICING.INDIVIDUAL.ANNUAL * 12;
        default:
            return 0;
    }
}

function calculateCoveredSessionsTotal({
    coveredSessions,
    seats,
}: {
    coveredSessions: number;
    seats: number;
}) {
    return coveredSessions * COVERED_SESSION_PRICE * seats;
}
export interface AccountDetailsFormProps {
    defaultValues?: Partial<SafeAccountDetails>;
    control: Control<HandleAccountOnboarding.Input>;
    minimumSeats?: number;
    maximumSeats?: number;
    sessionPrice: number;
    seatCount: number;
    billingCycle: HandleAccountOnboarding.Input['billingCycle'];
    coveredSessions: number;
    minCoveredSessions?: number;
    maxCoveredSessions?: number;
    disabled?: boolean;
    onInputBlur: () => void;
}

function getCoveredSessionPrompt(isTeam: boolean) {
    return isTeam
        ? 'Would you like to pre-pay for sessions with a mental health coach for your employees?'
        : 'Would you like to pre-pay for sessions with a mental health coach?';
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
    const wantsCoveredSessions = coveredSessionField.value > 0;
    const isTeamAccount = planType.value === 'team';
    return (
        <Box width="100%">
            <Header>Almost done! Just a few more details.</Header>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Paragraph marginTop={8}>
                    Are you purchasing a plan for yourself or for a team?
                </Paragraph>
                <RadioGroup
                    defaultChecked
                    defaultValue={planType.value}
                    onChange={(e) => {
                        const selectedTeamAccount = e.target.value === 'team';
                        if (selectedTeamAccount) {
                            if (billingCycleField.value === 'month') {
                                billingCycleField.onChange('biannual');
                            }
                            seatCountField.onChange(2);
                            accountNameField.onChange('');
                            planType.onChange('team');
                        } else {
                            seatCountField.onChange(1);
                            planType.onChange('individual');
                            accountNameField.onChange(defaultValues?.name);
                        }
                    }}
                    onBlur={onInputBlur}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <FormControlLabel
                        value={'individual'}
                        control={<Radio />}
                        label="Myself (1 person)"
                        itemType="https://schema.org/Boolean"
                        sx={{
                            flex: 1,
                        }}
                    />
                    <FormControlLabel
                        value={'team'}
                        control={<Radio />}
                        label="Team (2-50 people)"
                        itemType="https://schema.org/Boolean"
                        sx={{
                            flex: 1,
                        }}
                    />
                </RadioGroup>
                {billingCycle !== 'month' && isTeamAccount && (
                    <Stack marginTop={12}>
                        <AccountNameInput
                            control={control}
                            defaultValue={defaultValues?.name}
                            onInputBlur={onInputBlur}
                            disabled={disabled}
                        />
                    </Stack>
                )}
                <Box marginTop={12}>
                    <Divider />
                    <Paragraph bold marginTop={8}>
                        How would you like to be billed for your Therify
                        subscription?
                    </Paragraph>
                </Box>
                <BillingCycleButtons
                    control={control}
                    defaultValue={'month'}
                    disabled={disabled}
                    isTeamAccount={isTeamAccount}
                    onInputBlur={onInputBlur}
                />
                {planType.value === 'team' && (
                    <Stack marginTop={12}>
                        <Paragraph bold>
                            How many seats would you like to purchase?
                        </Paragraph>
                        <Subhead textAlign="center">{seatCount}</Subhead>
                        <Box display="flex" width="100%" marginRight={4}>
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
                        <Caption secondary margin={0}>
                            1 seat = 1 employee
                        </Caption>
                    </Stack>
                )}
                <Stack marginTop={10}>
                    <Paragraph bold>
                        {getCoveredSessionPrompt(isTeamAccount)}
                    </Paragraph>
                    <RadioGroup
                        onChange={(e) => {
                            const selectedCoveredSessions =
                                e.target.value === 'yes';
                            coveredSessionField.onChange(
                                selectedCoveredSessions === true ? 1 : 0
                            );
                            onInputBlur();
                        }}
                        defaultValue={
                            coveredSessionField.value > 0 ? 'yes' : 'no'
                        }
                        defaultChecked
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                        }}
                    >
                        <FormControlLabel
                            value={'no'}
                            control={<Radio />}
                            label="No"
                            itemType="https://schema.org/Boolean"
                            sx={{
                                flex: 1,
                            }}
                        />
                        <FormControlLabel
                            value={'yes'}
                            control={<Radio />}
                            label="Yes"
                            itemType="https://schema.org/Boolean"
                            sx={{
                                flex: 1,
                            }}
                        />
                    </RadioGroup>
                </Stack>
                {wantsCoveredSessions && (
                    <Stack marginTop={12}>
                        <Paragraph bold>
                            {renderCoveredSessionPrompt({
                                isTeam: isTeamAccount,
                                billingCycle,
                            })}
                        </Paragraph>
                        <Subhead textAlign="center">{coveredSessions}</Subhead>
                        <Box display="flex" width="100%" marginRight={4}>
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
                        <Caption secondary margin={0}>
                            ${COVERED_SESSION_PRICE} per covered session
                        </Caption>
                    </Stack>
                )}
                <Stack marginTop={10}>
                    <Divider />
                    <Box marginBottom={4}>
                        <SectionTitle>Your plan summary:</SectionTitle>
                    </Box>
                    <>
                        {!isTeamAccount && (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>Individual Plan:</Box>{' '}
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <b>{coveredSessions}</b> covered
                                        sessions
                                        {planType.value === 'team'
                                            ? ' per seat'
                                            : ''}
                                        :
                                    </Box>
                                    <Box sx={{ fontWeight: 'bold' }}>
                                        $
                                        {calculateCoveredSessionsTotal({
                                            coveredSessions,
                                            seats: seatCount,
                                        })}
                                    </Box>
                                </Box>
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
                            <Link
                                href="https://www.therify.co/contact"
                                target="_blank"
                            >
                                Contact us
                            </Link>{' '}
                            about our enterprise pricing.
                        </Paragraph>
                    )}
                </Stack>
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
