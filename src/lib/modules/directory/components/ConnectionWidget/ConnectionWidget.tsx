import { CelebrationContainer } from '@/lib/shared/components/ui/Containers/CelebrationContainer';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import { CheckCircle, EventBusy, Timer } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { Button } from '@/lib/shared/components/ui/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { H6 } from '@/lib/shared/components/ui/Typography';
import { NewClientStatus } from '@prisma/client';

interface OnProviderSelectedCallback {
    (params: { memberId: string; providerId: string }): void;
}

interface ConnectionWidgetProps {
    onProviderSelected?: OnProviderSelectedCallback;
    providerHasBeenSelected?: boolean;
    newClientStatus: NewClientStatus;
    providerName: string;
}

export const ConnectionWidget = ({
    providerHasBeenSelected,
    newClientStatus,
    providerName,
    onProviderSelected,
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
                        <Heading>We&apos;ve contacted {providerName}!</Heading>
                        <Description sx={{ color: 'white !important' }}>
                            They&apos;ll reach out to you shortly
                        </Description>
                    </Box>
                </AvailabilityContents>
            </ProviderSelectedContainer>
        );
    }
    return displayAvailability(
        newClientStatus,
        providerName,
        onProviderSelected
    );
};

function displayAvailability(
    newClientStatus: NewClientStatus,
    providerName: string,
    onProviderSelected?: OnProviderSelectedCallback,
    isMobile: boolean = false
) {
    switch (newClientStatus) {
        case NewClientStatus.accepting:
            return (
                <AvailabilityContainer
                    newClientStatus={NewClientStatus.accepting}
                >
                    <Box>
                        <Heading>Ready to contact {providerName}?</Heading>
                        {!isMobile && (
                            <Description>
                                Notify {providerName} that you&apos;re
                                interested in connecting
                            </Description>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            fullWidth
                            onClick={() => {
                                if (onProviderSelected) {
                                    onProviderSelected({
                                        memberId: 'memberId',
                                        providerId: 'providerId',
                                    });
                                }
                            }}
                        >
                            Select {providerName}
                        </Button>
                    </Box>
                </AvailabilityContainer>
            );
        case NewClientStatus.not_accepting:
            return (
                <AvailabilityContainer
                    newClientStatus={NewClientStatus.not_accepting}
                >
                    <AvailabilityContents>
                        <Box>
                            <EventBusy />
                        </Box>
                        <Box>
                            <Heading>
                                I&apos;m not currently accepting clients
                            </Heading>
                            {/* <Description sx={{ color: 'white !important' }}>
                                To be notified when I&apos;m available, click
                                here
                            </Description> */}
                        </Box>
                    </AvailabilityContents>
                </AvailabilityContainer>
            );
        case NewClientStatus.waitlist:
            return (
                <AvailabilityContainer
                    newClientStatus={NewClientStatus.waitlist}
                >
                    <AvailabilityContents>
                        <Box>
                            <Timer />
                        </Box>
                        <Box>
                            <Heading>I&apos;m currently at capacity</Heading>
                            {/* <Description sx={{ color: 'white !important' }}>
                                To be added to my waitlist, click here
                            </Description> */}
                        </Box>
                    </AvailabilityContents>
                </AvailabilityContainer>
            );
    }
}

const ProviderSelectedContainer = styled(CelebrationContainer)(({ theme }) => ({
    padding: '1.688rem 1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius,
        minWidth: 570,
        maxWidth: '100%',
        position: 'sticky',
        top: 0,
        flexDirection: 'column',
        textAlign: 'center',
    },
}));

const AvailabilityContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'newClientStatus',
})<{
    newClientStatus: NewClientStatus;
}>(
    ({ theme, newClientStatus }) => ({
        boxShadow: theme.shadows[2],
        padding: '1.688rem 1rem',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'white',
        ...(newClientStatus === NewClientStatus.accepting && {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            '& > *:first-of-type': {
                marginRight: theme.spacing(10),
            },
        }),
        ...(newClientStatus === NewClientStatus.not_accepting && {
            background: theme.palette.error.main,
            display: 'flex',
            justifyContent: 'center',
        }),
        ...(newClientStatus === NewClientStatus.waitlist && {
            background: theme.palette.warning.main,
            display: 'flex',
            justifyContent: 'center',
        }),
        [theme.breakpoints.up('md')]: {
            minWidth: 570,
            maxWidth: '100%',
            position: 'sticky',
            top: 0,
            flexDirection: 'column',
            textAlign: 'center',
        },
    }),
    ({}) => ({})
);

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

const Description = styled(Paragraph)(({ theme }) => {
    return {
        ...theme.typography.body1,
        fontSize: '0.875rem',
        fontWeight: 400,
        padding: 0,
        margin: 0,
        [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem',
            marginBottom: theme.spacing(4),
        },
    };
});
