import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { trpc } from '@/lib/utils/trpc';
import {
    FormContainer,
    StepperContainer,
    Button,
    Caption,
} from '@/components/ui';
import {
    PracticeDetailsForm,
    usePracticeOnboardingStorage,
} from '@/components/features/onboarding';
import { useForm } from 'react-hook-form';
import { ArrowForwardRounded as NextIcon } from '@mui/icons-material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getProductByEnvironment, PRODUCTS } from '@/lib/types';
import { TRPCClientError } from '@trpc/client';
import Link from 'next/link';
import { URL_PATHS } from '@/lib/sitemap';

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;

const PRODUCT = getProductByEnvironment(
    PRODUCTS.GROUP_PRACTICE_PLAN,
    process.env.NODE_ENV
);

export default function PracticeOnboardingPage() {
    const theme = useTheme();
    const [errorMessage, setErrorMessage] = useState<string>();
    const { getStoredPracticeDetails, storePracticeDetails } =
        usePracticeOnboardingStorage();
    const { user, isLoading: isLoadingUser } = useUser();
    const practiceDetailsForm = useForm<HandlePracticeOnboarding.Input>({
        mode: 'onChange',
        defaultValues: {
            ...getStoredPracticeDetails(),
            priceId: PRODUCT.PRICES.DEFAULT,
        },
    });

    useEffect(() => {
        if (user?.sub) {
            practiceDetailsForm.setValue('auth0UserId', user.sub);
        }
    }, [practiceDetailsForm, user?.sub]);

    const mutation = trpc.useMutation(
        'accounts.onboarding.handle-practice-onboarding',
        {
            onSuccess(response) {
                const parseResult =
                    HandlePracticeOnboarding.outputSuccessSchema.safeParse(
                        response
                    );
                if (parseResult.success) {
                    window.location.href = parseResult.data.checkoutSessionUrl;
                    return;
                }
                const [error] = response.errors;
                if (error) {
                    setErrorMessage(error);
                    return;
                }
            },
            onError(error) {
                if (error instanceof TRPCClientError) {
                    try {
                        const [trpcError] = JSON.parse(error.message) as {
                            message: string;
                        }[];
                        setErrorMessage(trpcError.message ?? error.message);
                        return;
                    } catch (e) {}
                }
                setErrorMessage(error.message);
            },
        }
    );

    const handlePracticeOnboarding = async function () {
        setErrorMessage(undefined);
        const practiceDetails = practiceDetailsForm.getValues();
        return mutation.mutate(practiceDetails);
    };

    return (
        <PageContainer>
            <InnerContent>
                <StepperContainer
                    currentStepIndex={1}
                    steps={REGISTRATION_STEPS as unknown as string[]}
                >
                    <FormContainer
                        errorMessage={errorMessage}
                        isLoading={isLoadingUser}
                    >
                        <PracticeDetailsForm
                            defaultValues={undefined}
                            control={practiceDetailsForm.control}
                            seatCount={practiceDetailsForm.watch('seatCount')}
                            baseSeatPrice={42}
                            onInputBlur={() =>
                                storePracticeDetails(
                                    practiceDetailsForm.getValues()
                                )
                            }
                        />
                    </FormContainer>
                    <ButtonContainer>
                        <Box display="flex" alignItems="flex-end">
                            <Caption>
                                Not the right time?{' '}
                                <Link
                                    href={URL_PATHS.AUTH.LOGOUT}
                                    style={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Logout
                                </Link>
                            </Caption>
                        </Box>
                        <Button
                            isLoading={mutation.isLoading}
                            disabled={!practiceDetailsForm.formState.isValid}
                            endIcon={<NextIcon />}
                            onClick={handlePracticeOnboarding}
                        >
                            Proceed to billing
                        </Button>
                    </ButtonContainer>
                </StepperContainer>
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

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(10),
}));
