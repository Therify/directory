import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, CircularProgress } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReportProblemRounded, CheckCircle } from '@mui/icons-material';
import {
    Alert,
    CenteredContainer,
    Stepper,
    TherifyLogo,
    H3,
    FormValidation,
    Paragraph,
} from '../../../ui';
import { ProviderRegistrationForm, FlowNavigation } from './ui';
import {
    useRegistrationForms,
    useRegistrationStorage,
    useRegistrationFlowNavigation,
} from './hooks';
import { RegisterProvider } from '@/lib/features/registration';
import { ALERT_TYPE } from '@/components/ui/Alert';

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;

interface ProviderRegistrationFlowProps {
    registerProvider: (providerDetails: RegisterProvider.Input) => void;
    errorMessage?: string;
    clearErrorMessage: () => void;
    isRegisteringProvider: boolean;
    emailValidationUrl: string;
    isRegistrationComplete: boolean;
}

export const ProviderRegistrationFlow = ({
    registerProvider,
    errorMessage,
    isRegisteringProvider,
    isRegistrationComplete,
    emailValidationUrl,
    clearErrorMessage,
}: ProviderRegistrationFlowProps) => {
    const theme = useTheme;
    const [emailsCheckedForUniqueness, setEmailsCheckedForUniqueness] =
        useState<Record<string, boolean>>({});
    const { getStoredProviderDetails, storeProviderDetails } =
        useRegistrationStorage();
    const { providerDetailsForm, numberOfSeatsForm } = useRegistrationForms({
        defaultProviderDetails: getStoredProviderDetails(),
    });
    const {
        steps,
        isLoading: isLoadingNextStep,
        back,
    } = useRegistrationFlowNavigation(
        REGISTRATION_STEPS as unknown as string[]
    );

    const handleSubmit = () => {
        // TODO: Store partial on blur
        storeProviderDetails(providerDetailsForm.getValues());
        return registerProvider(providerDetailsForm.getValues());
    };
    const debounceRef = useRef<number>();
    const emailAddress = providerDetailsForm.watch('emailAddress');

    useEffect(() => {
        const shouldFetchUniqueness =
            !!emailAddress &&
            FormValidation.isValidEmail(emailAddress) &&
            emailsCheckedForUniqueness[emailAddress] === undefined;

        if (shouldFetchUniqueness) {
            window.clearTimeout(debounceRef.current);
            debounceRef.current = window.setTimeout(async () => {
                const isEmailUnique = await FormValidation.isUniqueEmailFactory(
                    emailValidationUrl
                )(emailAddress.toLowerCase().trim());
                setEmailsCheckedForUniqueness((prev) => ({
                    ...prev,
                    [emailAddress]: isEmailUnique,
                }));
            }, 500);
        }
    }, [emailAddress, emailValidationUrl, emailsCheckedForUniqueness]);

    if (isRegistrationComplete) {
        return (
            <FormContainer isError={false}>
                <CenteredContainer>
                    <CheckCircle
                        color="success"
                        style={{ width: 40, height: 40 }}
                    />
                    <H3>
                        Welcome, {providerDetailsForm.getValues('givenName')}!
                    </H3>
                    <Paragraph>Registration successful</Paragraph>
                </CenteredContainer>
            </FormContainer>
        );
    }

    return (
        <Box height="100%" width="100%">
            <HeaderContainer>
                <Logo />
                <StepperContainer>
                    <Stepper
                        activeStepIndex={0}
                        steps={steps as unknown as string[]}
                    />
                </StepperContainer>
            </HeaderContainer>
            <FormContainer isError={Boolean(errorMessage)}>
                {isRegisteringProvider ? (
                    <CenteredContainer>
                        <H3>Creating your account...</H3>
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <ProviderRegistrationForm
                        isEmailUnique={emailsCheckedForUniqueness[emailAddress]}
                        control={providerDetailsForm.control}
                        password={providerDetailsForm.watch('password')}
                    />
                )}

                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Alert
                            icon={<ErrorIcon />}
                            type={ALERT_TYPE.ERROR}
                            title={errorMessage ?? ''}
                            onClose={() => {
                                clearErrorMessage();
                            }}
                        />
                    </motion.div>
                )}
            </FormContainer>

            <FlowNavigation
                currentStepIndex={0}
                onBack={back}
                onNext={handleSubmit}
                isFinalStep
                isNextLoading={isLoadingNextStep || isRegisteringProvider}
                isNextDisabled={!providerDetailsForm.formState.isValid}
            />
        </Box>
    );
};

const ErrorIcon = () => (
    <CenteredContainer>
        <ReportProblemRounded />
    </CenteredContainer>
);

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
}));

const StepperContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
}));

const Logo = styled(TherifyLogo)(({ theme }) => ({
    height: '52px',
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
}));

const FormContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError: boolean }>(({ theme, isError }) => ({
    width: '100%',
    minHeight: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6.5, 8),
    marginTop: theme.spacing(10),
    transition: '.2s ease-in-out',
    ...(isError && { border: `2px solid ${theme.palette.error.main}` }),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(30),
    },
}));
