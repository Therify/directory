import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import { trpc } from '@/lib/shared/utils/trpc';
import {
    FormContainer,
    StepperContainer,
    Button,
    Caption,
} from '@/lib/shared/components/ui';
import {
    AccountDetailsForm,
    useAccountOnboardingStorage,
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

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({})
);

const defaultIndividualAccountName = 'Individual Member Plan';

export default function DTCAccountOnboardingPage() {
    const theme = useTheme();
    const [errorMessage, setErrorMessage] = useState<string>();
    const { getStoredAccountDetails, storeAccountDetails } =
        useAccountOnboardingStorage();
    const { user, isLoading: isLoadingUser } = useUser();
    const individualAccountDetails: {
        seatCount: 1;
        name: string;
        planType: 'individual';
    } = {
        seatCount: 1,
        name: defaultIndividualAccountName,
        planType: 'individual',
    };
    const accountDetailsForm = useForm<HandleAccountOnboarding.Input>({
        mode: 'onChange',
        defaultValues: {
            billingUserId: user?.sub ?? '',
            coveredSessions: 0,
            billingCycle: 'month',
            ...getStoredAccountDetails(),
            ...individualAccountDetails,
        } as Partial<HandleAccountOnboarding.Input>,
    });
    const billingCycle = accountDetailsForm.watch('billingCycle');
    const { isLoading: isLoadingAccount, data: accountData } = trpc.useQuery(
        [
            'accounts.accounts.get-account-by-owner-id',
            {
                ownerId: user?.sub ?? '',
            },
        ],
        {
            enabled: Boolean(user?.sub),
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        if (accountData?.name) {
            accountDetailsForm.setValue('name', accountData.name);
        }
    }, [accountDetailsForm, accountData?.name]);

    useEffect(() => {
        if (user?.sub) {
            accountDetailsForm.setValue('billingUserId', user.sub);
        }
    }, [accountDetailsForm, user?.sub]);

    const { isLoading: isHandlingAccountSubmission, mutate: submitAccount } =
        trpc.useMutation('accounts.onboarding.handle-account-onboarding', {
            onSuccess(response) {
                const parseResult =
                    HandleAccountOnboarding.outputSuccessSchema.safeParse(
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

    const handleAccountOnboarding = async function () {
        setErrorMessage(undefined);
        submitAccount({
            ...accountDetailsForm.getValues(),
            ...individualAccountDetails,
            isDtcAccount: true,
        });
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
                        isLoading={
                            isLoadingUser ||
                            isLoadingAccount ||
                            isHandlingAccountSubmission
                        }
                    >
                        <AccountDetailsForm
                            allowTeamAccount={false}
                            defaultValues={{
                                name: defaultIndividualAccountName,
                            }}
                            control={accountDetailsForm.control}
                            seatCount={1}
                            coveredSessions={accountDetailsForm.watch(
                                'coveredSessions'
                            )}
                            maximumSeats={1}
                            onInputBlur={() =>
                                storeAccountDetails(
                                    accountDetailsForm.getValues()
                                )
                            }
                            billingCycle={billingCycle}
                            disabled={
                                isLoadingUser ||
                                isLoadingAccount ||
                                isHandlingAccountSubmission
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
                            isLoading={false}
                            disabled={
                                !accountDetailsForm.formState.isValid ||
                                isLoadingUser ||
                                isLoadingAccount ||
                                isHandlingAccountSubmission
                            }
                            endIcon={<NextIcon />}
                            onClick={handleAccountOnboarding}
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
