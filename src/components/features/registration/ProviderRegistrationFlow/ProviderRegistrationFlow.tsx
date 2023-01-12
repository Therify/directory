import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { styled, Box, CircularProgress } from '@mui/material';
import { ReportProblemRounded } from '@mui/icons-material';
import {
    Alert,
    AlertType,
    CenteredContainer,
    Stepper,
    TherifyLogo,
    H3,
    FormValidation,
} from '../../../ui';
import { ProviderRegistrationForm, FlowNavigation, SeatCountForm } from './ui';
import {
    useRegistrationForms,
    useRegistrationStorage,
    useRegistrationFlowNavigation,
} from './hooks';
import { RegisterProvider } from '@/lib/features/registration';
import { ALERT_TYPE } from '@/components/ui/Alert';

const REGISTRATION_STEPS = ['Registration', 'Select Plan', 'Payment'] as const;

interface ProviderRegistrationFlowProps {
    registerProvider: (input: {
        providerDetails: RegisterProvider.Input['providerDetails'];
        numberOfSeats: RegisterProvider.Input['numberOfSeats'];
    }) => void;
    errorMessage?: string;
    clearErrorMessage: () => void;
    isRegisteringProvider: boolean;
    emailValidationUrl: string;
    baseSeatPrice: number;
}

export const ProviderRegistrationFlow = ({
    registerProvider,
    errorMessage,
    isRegisteringProvider,
    emailValidationUrl,
    clearErrorMessage,
    baseSeatPrice,
}: ProviderRegistrationFlowProps) => {
    const [emailsCheckedForUniqueness, setEmailsCheckedForUniqueness] =
        useState<Record<string, boolean>>({});
    const { getStoredProviderDetails, storeProviderDetails } =
        useRegistrationStorage();
    const { providerDetailsForm, numberOfSeatsForm } = useRegistrationForms({
        defaultProviderDetails: getStoredProviderDetails(),
    });
    const {
        currentStepIndex,
        steps,
        isLoading: isLoadingNextStep,
        setCurrentStepIndex,
        back,
    } = useRegistrationFlowNavigation(
        REGISTRATION_STEPS as unknown as string[]
    );

    const handleNext = () => {
        if (currentStepIndex === 0) {
            storeProviderDetails(providerDetailsForm.getValues());
            return setCurrentStepIndex(1);
        }
        if (currentStepIndex === 1) {
            return registerProvider({
                providerDetails: providerDetailsForm.getValues(),
                numberOfSeats: numberOfSeatsForm.getValues().numberOfSeats,
            });
        }
    };
    const debounceRef = useRef<number>();
    const emailAddress = providerDetailsForm.watch('emailAddress');
    const numberOfSeats = numberOfSeatsForm.watch('numberOfSeats');

    const isNextDisabled = () => {
        if (currentStepIndex === 0) {
            return !providerDetailsForm.formState.isValid;
        }
        if (currentStepIndex === 1) {
            return (
                !numberOfSeatsForm.formState.isValid ||
                !providerDetailsForm.formState.isValid
            );
        }
        return false;
    };

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
    if (isRegisteringProvider) {
        return (
            <CenteredContainer>
                <H3>Creating your account...</H3>
                <CircularProgress />
            </CenteredContainer>
        );
    }
    return (
        <Box height="100%" width="100%">
            <HeaderContainer>
                <Logo />
                <StepperContainer>
                    <Stepper
                        activeStepIndex={currentStepIndex}
                        steps={steps as unknown as string[]}
                    />
                </StepperContainer>
            </HeaderContainer>
            <FormContainer isError={Boolean(errorMessage)}>
                {currentStepIndex === 0 && (
                    <ProviderRegistrationForm
                        isEmailUnique={emailsCheckedForUniqueness[emailAddress]}
                        control={providerDetailsForm.control}
                        password={providerDetailsForm.watch('password')}
                    />
                )}
                {currentStepIndex === 1 && (
                    <SeatCountForm
                        control={numberOfSeatsForm.control}
                        {...{ baseSeatPrice, numberOfSeats }}
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
                currentStepIndex={currentStepIndex}
                onBack={back}
                onNext={handleNext}
                isFinalStep={currentStepIndex === 1}
                isNextLoading={isLoadingNextStep || isRegisteringProvider}
                isNextDisabled={isNextDisabled()}
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
