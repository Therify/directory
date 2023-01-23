import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    FormContainer,
    StepperContainer,
    LoadingContainer,
    H1,
    Caption,
    Paragraph,
} from '@/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { usePracticeOnboardingStorage } from '@/components/features/onboarding';
import { trpc } from '@/lib/utils/trpc';
import { useUser } from '@auth0/nextjs-auth0/client';
import { PlanStatus } from '@prisma/client';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';

export const getServerSideProps = withPageAuthRequired();

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;
const THIRTY_SECONDS = 1000 * 30;

export default function BillingSuccessPage() {
    const { isLoading: isLoadingUser, user } = useUser();
    const router = useRouter();
    const { clearStorage } = usePracticeOnboardingStorage();
    const [allowRefetch, setAllowRefetch] = useState(true);
    useEffect(clearStorage, [clearStorage]);
    console.log('render');
    const timeoutRef = useRef<number>();

    useEffect(() => {
        timeoutRef.current = window.setTimeout(() => {
            setAllowRefetch(false);
        }, THIRTY_SECONDS);
        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const {
        data: planStatus,
        error: queryError,
        isLoading: isLoadingPlan,
        isRefetching,
    } = trpc.useQuery(
        [
            'accounts.users.get-plan-status-by-user-id',
            {
                auth0Id: user?.sub ?? '',
            },
        ],
        {
            refetchInterval: allowRefetch
                ? (data) => {
                      console.log({ data });
                      if (data && data.status !== null) {
                          console.log('received status...');
                          window.clearTimeout(timeoutRef.current);
                          return false;
                      }
                      return 2000;
                  }
                : false,
            enabled: Boolean(user?.sub),
        }
    );

    useEffect(() => {
        if (planStatus?.status === PlanStatus.active) {
            router.push(URL_PATHS.PROVIDERS.ONBOARDING.INVITATIONS);
        }
    }, [planStatus?.status, router]);

    const [planError] = planStatus?.errors ?? [];
    const isPlanInctive =
        typeof planStatus?.status === 'string' &&
        planStatus.status !== PlanStatus.active;
    const planStatusMessage = isPlanInctive
        ? `Your plan is not active. Please contact support.`
        : undefined;
    const errorMessage = planError ?? queryError?.message ?? planStatusMessage;
    const isLoading =
        isLoadingUser ||
        isLoadingPlan ||
        isRefetching ||
        planStatus?.status === null;
    return (
        <PageContainer>
            <InnerContent>
                <StepperContainer
                    currentStepIndex={1}
                    steps={REGISTRATION_STEPS as unknown as string[]}
                >
                    <FormContainer errorMessage={errorMessage}>
                        <LoadingContainer
                            isLoading={isLoading}
                            loadingTopSlot={
                                <Header>Setting up your practice...</Header>
                            }
                            loadingBottomSlot={
                                <Disclaimer>
                                    This may take up to 60 seconds
                                </Disclaimer>
                            }
                        >
                            {errorMessage ? (
                                <Header>There seems to be an issue...</Header>
                            ) : (
                                <Header>Setup complete!</Header>
                            )}
                            {isPlanInctive && (
                                <Paragraph>
                                    Your plan&apos;s status: {planStatus.status}
                                </Paragraph>
                            )}
                        </LoadingContainer>
                    </FormContainer>
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

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
}));

const Disclaimer = styled(Caption)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(6),
}));
