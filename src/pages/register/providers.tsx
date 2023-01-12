import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements/Input';
import { TherifyLogo } from '@/components/ui/Logo';
import { Stepper } from '@/components/ui/Stepper';
import { H1 } from '@/components/ui/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function ProviderRegistration() {
    return (
        <PageContainer>
            <InnerContent>
                <HeaderContainer>
                    <Logo />
                    <StepperContainer>
                        <Stepper
                            activeStepIndex={0}
                            steps={['Registration', 'Payment']}
                        />
                    </StepperContainer>
                </HeaderContainer>
                <FormContainer>
                    <Box width={'100%'}>
                        <Header>
                            We’re happy you’re here!
                            <br />
                            To start let’s get you registered.
                        </Header>
                        <Form>
                            <Input
                                required
                                fullWidthInput
                                type="email"
                                label="Email"
                                autoComplete="email"
                            />
                            <Input
                                required
                                fullWidthInput
                                type="password"
                                label="Password"
                                autoComplete="password"
                            />
                            <Input
                                required
                                fullWidthInput
                                type="password"
                                label="Confirm Password"
                                autoComplete="password"
                            />
                        </Form>
                        <Button fullWidth>Continue</Button>
                    </Box>
                </FormContainer>
            </InnerContent>
        </PageContainer>
    );
}

const PageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    height: '100%',
    width: '100%',
}));

const InnerContent = styled(Box)(({ theme }) => ({
    maxWidth: '1200px',
    width: '100%',
    padding: theme.spacing(12, 4.5),
    margin: '0 auto',
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    width: '75%',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

export const Logo = styled(TherifyLogo)(({ theme }) => ({
    height: 52,
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
}));

export const StepperContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
}));

const FormContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isError',
})<{ hasError?: boolean }>(({ theme, hasError = false }) => ({
    width: '100%',
    minHeight: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6.5, 8),
    marginTop: theme.spacing(10),
    transition: '.2s ease-in-out',
    ...(hasError && { border: `2px solid ${theme.palette.error.main}` }),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(30),
    },
}));

const Form = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    '& > *': {},
    [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: theme.spacing(4),
        '& > *:nth-of-type(1)': {
            gridColumn: '1 / 3',
        },
    },
}));
