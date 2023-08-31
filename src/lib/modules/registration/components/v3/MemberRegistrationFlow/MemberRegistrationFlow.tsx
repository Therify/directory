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
    Paragraph,
} from '@/lib/shared/components/ui';
import { ALERT_TYPE } from '@/lib/shared/components/ui/Alert';
import { ROLES } from '@/lib/shared/types/roles';
import { MemberRegistrationForm } from './ui';
import { useRegistrationStorage } from './hooks';
import { Account } from '@prisma/client';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { InsuranceProvider } from '@/lib/shared/types';
import { RegisterMember } from '../../../features/v3';

const REGISTRATION_STEPS = ['Registration', 'Onboarding'] as const;

interface MemberRegistrationFlowProps {
    registerMember: (providerDetails: RegisterMember.Input) => void;
    errorMessage?: string;
    clearErrorMessage: () => void;
    isRegisteringMember: boolean;
    emailValidationUrl: string;
    isRegistrationComplete: boolean;
    role: typeof ROLES.MEMBER;
    account?: Account;
    hasSeatsAvailable?: boolean;
    showInsurances?: boolean;
    registrationSteps?: string[];
}

export const MemberRegistrationFlow = ({
    registerMember,
    errorMessage,
    isRegisteringMember,
    isRegistrationComplete,
    emailValidationUrl,
    clearErrorMessage,
    role,
    account,
    hasSeatsAvailable = false,
    showInsurances = true,
    registrationSteps = REGISTRATION_STEPS as unknown as string[],
}: MemberRegistrationFlowProps) => {
    const [emailsCheckedForUniqueness, setEmailsCheckedForUniqueness] =
        useState<Record<string, boolean>>({});
    const { getStoredMemberDetails, storeMemberDetails } =
        useRegistrationStorage();
    const storedDefaults = getStoredMemberDetails();
    const memberDetailsForm = useForm<RegisterMember.Input>({
        mode: 'onChange',
        defaultValues: {
            user: {
                ...storedDefaults?.user,
                role,
            },
            profile: {
                ...storedDefaults?.profile,
                concerns: [],
                goals: [],
                ...(!showInsurances
                    ? { insurance: InsuranceProvider.MAP.I_DONT_HAVE_INSURANCE }
                    : {}),
            },
        },
    });
    const isRegistrationSuccessful = isRegistrationComplete && !errorMessage;
    const isRegistering = isRegisteringMember || isRegistrationSuccessful;
    const handleSubmit = () => {
        // TODO: Store partial on blur
        storeMemberDetails(memberDetailsForm.getValues());
        return registerMember(memberDetailsForm.getValues());
    };
    const debounceRef = useRef<number>();
    const emailAddress = memberDetailsForm.watch('user.emailAddress');
    const country = memberDetailsForm.watch('profile.country');

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

    if (!hasSeatsAvailable) {
        return (
            <Box height="100%" width="100%">
                <HeaderContainer>
                    <Logo />
                </HeaderContainer>
                <FormContainer isError={false}>
                    <CenteredContainer>
                        <H3>
                            Sorry,{' '}
                            <Typography
                                color="primary"
                                typography={'h3'}
                                sx={{ fontWeight: 700, display: 'inline' }}
                            >
                                {account?.name ?? 'the account provided'}
                            </Typography>{' '}
                            is currently at capacity.
                        </H3>
                        <Paragraph>
                            If you believe this is an error, please contact{' '}
                            <Link href="mailto:help@therify.co">
                                help@therify.co
                            </Link>{' '}
                            for assistance.
                        </Paragraph>
                    </CenteredContainer>
                </FormContainer>
            </Box>
        );
    }

    return (
        <Box height="100%" width="100%">
            <HeaderContainer>
                <Logo />
                <StepperContainer>
                    <Stepper activeStepIndex={0} steps={registrationSteps} />
                </StepperContainer>
            </HeaderContainer>
            <FormContainer isError={Boolean(errorMessage)}>
                {isRegistering ? (
                    <CenteredContainer>
                        <H3>Creating your account...</H3>
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <MemberRegistrationForm
                        registerInput={memberDetailsForm.register}
                        getFieldState={memberDetailsForm.getFieldState}
                        isEmailUnique={emailsCheckedForUniqueness[emailAddress]}
                        control={memberDetailsForm.control}
                        password={memberDetailsForm.watch('user.password')}
                        role={role}
                        account={account}
                        country={country}
                        showInsurances={showInsurances}
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
