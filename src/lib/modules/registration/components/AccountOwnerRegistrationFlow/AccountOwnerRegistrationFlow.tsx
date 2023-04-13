import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    ReportProblemRounded,
    ArrowForwardRounded as NextIcon,
} from '@mui/icons-material';
import {
    Alert,
    CenteredContainer,
    Stepper,
    TherifyLogo,
    H3,
    FormValidation,
    Button,
} from '@/lib/shared/components/ui';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { ALERT_TYPE } from '@/lib/shared/components/ui/Alert';
import { ROLES } from '@/lib/shared/types/roles';
import { AccountOwnerRegistrationForm } from './ui';
import { useRegistrationStorage } from './hooks';

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;

interface AccountOwnerRegistrationFlowProps {
    registerAccountOwner: (
        accountOwnerDetails: RegisterAccountOwner.Input
    ) => void;
    errorMessage?: string;
    clearErrorMessage: () => void;
    isRegisteringAccountOwner: boolean;
    emailValidationUrl: string;
    isRegistrationComplete: boolean;
    role: typeof ROLES.ACCOUNT_OWNER;
    hasSeatsAvailable?: boolean;
}

export const AccountOwnerRegistrationFlow = ({
    registerAccountOwner,
    errorMessage,
    isRegisteringAccountOwner,
    isRegistrationComplete,
    emailValidationUrl,
    clearErrorMessage,
    role,
}: AccountOwnerRegistrationFlowProps) => {
    const [emailsCheckedForUniqueness, setEmailsCheckedForUniqueness] =
        useState<Record<string, boolean>>({});
    const { getStoredAccountOwnerDetails, storeAccountOwnerDetails } =
        useRegistrationStorage();
    const memberDetailsForm = useForm<RegisterAccountOwner.Input>({
        mode: 'onChange',
        defaultValues: {
            ...getStoredAccountOwnerDetails(),
            role,
            concerns: [],
            goals: [],
        },
    });
    const isRegistrationSuccessful = isRegistrationComplete && !errorMessage;
    const isRegistering = isRegisteringAccountOwner || isRegistrationSuccessful;
    const handleSubmit = () => {
        // TODO: Store partial on blur
        storeAccountOwnerDetails(memberDetailsForm.getValues());
        return registerAccountOwner(memberDetailsForm.getValues());
    };
    const debounceRef = useRef<number>();
    const emailAddress = memberDetailsForm.watch('emailAddress');
    const country = memberDetailsForm.watch('country');

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

    return (
        <Box height="100%" width="100%">
            <HeaderContainer>
                <Logo />
                <StepperContainer>
                    <Stepper
                        activeStepIndex={0}
                        steps={REGISTRATION_STEPS as unknown as string[]}
                    />
                </StepperContainer>
            </HeaderContainer>
            <FormContainer isError={Boolean(errorMessage)}>
                {isRegistering ? (
                    <CenteredContainer>
                        <H3>Creating your account...</H3>
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <AccountOwnerRegistrationForm
                        isEmailUnique={emailsCheckedForUniqueness[emailAddress]}
                        control={memberDetailsForm.control}
                        password={memberDetailsForm.watch('password')}
                        role={role}
                        country={country}
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

            <ButtonContainer>
                {!isRegistering && (
                    <Button
                        isLoading={isRegistering}
                        disabled={!memberDetailsForm.formState.isValid}
                        endIcon={<NextIcon />}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                )}
            </ButtonContainer>
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

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(10),
    '& button:last-child': {
        marginLeft: theme.spacing(4),
    },
}));
