import { CelebrationContainer } from '@/lib/shared/components/ui/Containers/CelebrationContainer';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import { ProviderAvailability } from '@/lib/shared/types';
import { CheckCircle, EventBusy, Timer } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { Button } from '@/lib/shared/components/ui/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { H6 } from '@/lib/shared/components/ui/Typography';

interface OnProviderSelectedCallback {
    (params: { memberId: string; providerId: string }): void;
}

interface ConnectionWidgetProps {
    onProviderSelected?: OnProviderSelectedCallback;
    providerHasBeenSelected?: boolean;
    providerAvailability: ProviderAvailability.ProviderAvailability;
}

export const ConnectionWidget = ({
    providerHasBeenSelected,
    providerAvailability,
}: ConnectionWidgetProps) => {
    if (providerHasBeenSelected) {
        return (
            <ProviderSelectedContainer>
                <AvailabilityContents>
                    <Box>
                        <CheckCircle
                            sx={{
                                fontSize: {
                                    sm: '2.125rem',
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Heading>We&apos;ve contacted Provider Name!</Heading>
                        <Description
                            providerAvailability={providerAvailability}
                            sx={{ color: 'white !important' }}
                        >
                            They&apos;ll reach out to you to schedule time
                        </Description>
                    </Box>
                </AvailabilityContents>
            </ProviderSelectedContainer>
        );
    }
    return displayAvailability(providerAvailability);
};

function displayAvailability(
    availability: ProviderAvailability.ProviderAvailability,
    isMobile: boolean = false
) {
    switch (availability) {
        case ProviderAvailability.MAP.AVAILABLE:
            return (
                <AvailabilityContainer providerAvailability={availability}>
                    <Box>
                        <Heading>Ready to contact ProviderName?</Heading>
                        {!isMobile && (
                            <Description providerAvailability={availability}>
                                Notify providerName that you&apos;re interested
                                in connecting
                            </Description>
                        )}
                    </Box>
                    <Button fullWidth>Select ProviderName</Button>
                </AvailabilityContainer>
            );
        case ProviderAvailability.MAP.UNAVAILABLE:
            return (
                <AvailabilityContainer providerAvailability={availability}>
                    <AvailabilityContents>
                        <Box>
                            <EventBusy />
                        </Box>
                        <Box>
                            <Heading>
                                I&apos;m not currently accepting clients
                            </Heading>
                            <Description
                                providerAvailability={availability}
                                sx={{ color: 'white !important' }}
                            >
                                To be notified when I&apos;m available, click
                                here
                            </Description>
                        </Box>
                    </AvailabilityContents>
                </AvailabilityContainer>
            );
        case ProviderAvailability.MAP.WAIT_LIST:
            return (
                <AvailabilityContainer providerAvailability={availability}>
                    <AvailabilityContents>
                        <Box>
                            <Timer />
                        </Box>
                        <Box>
                            <Heading>I&apos;m currently at capacity</Heading>
                            <Description
                                providerAvailability={availability}
                                sx={{ color: 'white !important' }}
                            >
                                To be added to my waitlist, click here
                            </Description>
                        </Box>
                    </AvailabilityContents>
                </AvailabilityContainer>
            );
    }
}

const ProviderSelectedContainer = styled(CelebrationContainer)(({ theme }) => ({
    padding: '1.688rem 1rem',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        textAlign: 'center',
        position: 'relative',
    },
}));

const AvailabilityContainer = styled(Box)<{
    providerAvailability: ProviderAvailability.ProviderAvailability;
}>(({ theme, providerAvailability }) => ({
    padding: '1.688rem 1rem',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'white',
    ...(providerAvailability === ProviderAvailability.MAP.AVAILABLE && {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '& > *:first-child': {
            marginRight: theme.spacing(10),
        },
    }),
    ...(providerAvailability === ProviderAvailability.MAP.UNAVAILABLE && {
        background: theme.palette.error.main,
        display: 'flex',
        justifyContent: 'center',
    }),
    ...(providerAvailability === ProviderAvailability.MAP.WAIT_LIST && {
        background: theme.palette.warning.main,
        display: 'flex',
        justifyContent: 'center',
    }),
    [theme.breakpoints.up('md')]: {
        position: 'relative',
        flexDirection: 'column',
        textAlign: 'center',
    },
}));

const AvailabilityContents = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
        fontSize: '2.25rem',
        marginRight: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        '& .MuiSvgIcon-root': {
            marginRight: 0,
            marginBottom: theme.spacing(4),
        },
    },
}));

const Heading = styled(H6)(({ theme }) => ({
    ...theme.typography.body1,
    fontSize: '1rem',
    fontWeight: 600,
    padding: 0,
    margin: 0,
    [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
        marginBottom: theme.spacing(4),
    },
}));

const Description = styled(Paragraph)<{
    providerAvailability: ProviderAvailability.ProviderAvailability;
}>(({ theme, providerAvailability }) => {
    const shouldRenderWhiteText =
        providerAvailability === ProviderAvailability.MAP.UNAVAILABLE ||
        providerAvailability === ProviderAvailability.MAP.WAIT_LIST;
    return {
        ...theme.typography.body1,
        fontSize: '0.875rem',
        fontWeight: 400,
        padding: 0,
        margin: 0,
        ...(shouldRenderWhiteText && {
            color: 'white',
        }),
        [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem',
            marginBottom: theme.spacing(4),
        },
    };
});
