import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { trpc } from '@/lib/shared/utils/trpc';
import {
    FormContainer,
    StepperContainer,
    Button,
    Caption,
} from '@/lib/shared/components/ui';
import {
    PracticeDetailsForm,
    usePracticeOnboardingStorage,
} from '@/lib/modules/onboarding/components';
import { useForm } from 'react-hook-form';
import { ArrowForwardRounded as NextIcon } from '@mui/icons-material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { TRPCClientError } from '@trpc/client';
import Link from 'next/link';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
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
        },
    });
    const billingCycle = practiceDetailsForm.watch('billingCycle');
    const country = practiceDetailsForm.watch('country');

    const { isLoading: isLoadingPractice, data: practiceData } = trpc.useQuery(
        [
            'accounts.users.get-practice-by-owner-id',
            {
                userId: user?.sub ?? '',
            },
        ],
        {
            enabled: Boolean(user?.sub),
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        if (practiceData?.practice) {
            practiceDetailsForm.setValue(
                'practiceId',
                practiceData.practice.id
            );
            practiceDetailsForm.setValue(
                'address',
                practiceData.practice.address
            );
            practiceDetailsForm.setValue(
                'address2',
                practiceData.practice.address2 ?? undefined
            );
            practiceDetailsForm.setValue('email', practiceData.practice.email);
            practiceDetailsForm.setValue('city', practiceData.practice.city);
            practiceDetailsForm.setValue(
                'state',
                practiceData.practice
                    .state as HandlePracticeOnboarding.Input['state']
            );
            practiceDetailsForm.setValue('zip', practiceData.practice.zip);
            practiceDetailsForm.setValue(
                'country',
                practiceData.practice
                    .country as HandlePracticeOnboarding.Input['country']
            );
            practiceDetailsForm.setValue('name', practiceData.practice.name);
            practiceDetailsForm.setValue(
                'phone',
                practiceData.practice.phone ?? undefined
            );
            practiceDetailsForm.setValue(
                'website',
                practiceData.practice.website
            );
        }
    }, [practiceDetailsForm, practiceData?.practice]);

    useEffect(() => {
        if (user?.sub) {
            practiceDetailsForm.setValue('userId', user.sub);
        }
    }, [practiceDetailsForm, user?.sub]);

    const { isLoading: isHandlingPracticeSubmission, mutate: submitPractice } =
        trpc.useMutation(`accounts.${HandlePracticeOnboarding.TRPC_ROUTE}`, {
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
        });

    const handlePracticeOnboarding = async function () {
        setErrorMessage(undefined);
        const practiceDetails = practiceDetailsForm.getValues();
        return submitPractice(practiceDetails);
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
                        isLoading={isLoadingUser || isLoadingPractice}
                    >
                        <PracticeDetailsForm
                            defaultValues={undefined}
                            control={practiceDetailsForm.control}
                            seatCount={practiceDetailsForm.watch('seatCount')}
                            seatPrice={billingCycle === 'year' ? 372 : 39}
                            maximumSeats={35}
                            onInputBlur={() =>
                                storePracticeDetails(
                                    practiceDetailsForm.getValues()
                                )
                            }
                            billingCycle={billingCycle}
                            country={country}
                            disabled={
                                isLoadingUser ||
                                isLoadingPractice ||
                                isHandlingPracticeSubmission
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
                            isLoading={isHandlingPracticeSubmission}
                            disabled={
                                !practiceDetailsForm.formState.isValid ||
                                isLoadingUser ||
                                isLoadingPractice
                            }
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
