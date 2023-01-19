import { Control } from 'react-hook-form';
import { Box, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { H1, H2, H3, Paragraph, Subhead, Caption } from '@/components/ui';
import {
    PracticeNameInput,
    PracticeAddressInput,
    WebsiteInput,
    PhoneNumberInput,
    PracticeEmailInput,
    SeatCountInput,
} from './components/inputs';
import { SafePracticeDetails } from './hooks';

export interface PracticeDetailsFormProps {
    defaultValues?: Partial<SafePracticeDetails>;
    control: Control<HandlePracticeOnboarding.Input>;
    minimumSeats?: number;
    maximumSeats?: number;
    baseSeatPrice: number;
    seatCount: number;
    onInputBlur: () => void;
}

export const PracticeDetailsForm = ({
    defaultValues,
    control,
    minimumSeats = 1,
    maximumSeats = 15,
    baseSeatPrice,
    seatCount,
    onInputBlur,
}: PracticeDetailsFormProps) => {
    const theme = useTheme();
    if (!control) throw new Error('control is required');
    return (
        <Box width="100%">
            <Header>Tell us about your practice.</Header>
            <Form onSubmit={(e) => e.preventDefault()}>
                <PracticeNameInput
                    control={control}
                    defaultValue={defaultValues?.name}
                    onInputBlur={onInputBlur}
                />
                <SectionTitle>Practice Address</SectionTitle>
                <Caption>
                    Address will not be publicly listed unless you choose to
                    share on your profile(s).
                </Caption>
                <PracticeAddressInput
                    control={control}
                    defaultValues={{
                        address: defaultValues?.address,
                        address2: defaultValues?.address2 ?? undefined,
                        city: defaultValues?.city,
                        state: defaultValues?.state,
                        zip: defaultValues?.zip,
                    }}
                    onInputBlur={onInputBlur}
                />
                <SectionTitle>Contact </SectionTitle>
                <Caption>
                    Contact will not be publicly listed unless you choose to
                    share on your profile(s).
                </Caption>
                <PracticeEmailInput
                    control={control}
                    defaultValue={defaultValues?.email}
                    onInputBlur={onInputBlur}
                />
                <WebsiteInput
                    control={control}
                    defaultValue={defaultValues?.website ?? undefined}
                    onInputBlur={onInputBlur}
                />
                <PhoneNumberInput
                    control={control}
                    defaultValue={defaultValues?.phone ?? undefined}
                    onInputBlur={onInputBlur}
                />
                <SectionTitle>
                    How many providers are in your practice?
                </SectionTitle>
                <Subhead textAlign="center">{seatCount}</Subhead>
                <Box display="flex" width="100%" marginRight={4}>
                    <Paragraph>{minimumSeats}</Paragraph>
                    <SeatCountInput
                        control={control}
                        max={maximumSeats}
                        min={minimumSeats}
                        defaultValue={defaultValues?.seatCount ?? undefined}
                        onInputBlur={onInputBlur}
                    />
                    <Paragraph>{maximumSeats}</Paragraph>
                </Box>
                <Paragraph>Your plan:</Paragraph>
                <H3>${seatCount * baseSeatPrice} / month</H3>
                {seatCount === maximumSeats && (
                    <Paragraph>
                        Need more than {maximumSeats} seats?{' '}
                        <Link>Contact us</Link> about our enterprise pricing.
                    </Paragraph>
                )}
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
                    Stripe&apos;s checkout experience
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
    ...theme.typography.h4,
    marginTop: theme.spacing(8),
}));
