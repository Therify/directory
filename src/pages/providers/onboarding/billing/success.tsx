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
    Button,
    CenteredContainer,
} from '@/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { usePracticeOnboardingStorage } from '@/components/features/onboarding';
import { PlanStatus, Role } from '@prisma/client';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';
import { RBAC } from '@/lib/utils';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;
const SIXTY_SECONDS = 1000 * 60;

export default function BillingSuccessPage() {
    const router = useRouter();
    const { clearStorage } = usePracticeOnboardingStorage();
    const {
        user,
        isLoading: isLoadingUser,
        isRefetching,
        refetch,
        errorMessage: userError,
    } = useTherifyUser();

    const [allowRefetch, setAllowRefetch] = useState(true);
    const timeoutRef = useRef<number>();
    const refetchRef = useRef<number>();

    useEffect(clearStorage, [clearStorage]);
    useEffect(() => {
        timeoutRef.current = window.setTimeout(() => {
            setAllowRefetch(false);
            window.clearInterval(refetchRef.current);
        }, SIXTY_SECONDS);
        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        refetchRef.current = window.setInterval(() => {
            if (!user?.plan) {
                refetch?.();
            } else {
                window.clearInterval(refetchRef.current);
                window.clearTimeout(timeoutRef.current);
            }
        }, 2000);
        return () => {
            window.clearInterval(refetchRef.current);
        };
    }, [refetch, user?.plan]);

    useEffect(() => {
        if (
            user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing
        ) {
            router.push(
                user.roles.includes(Role.provider_therapist)
                    ? URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD
                    : URL_PATHS.PROVIDERS.COACH.DASHBOARD
            );
        }
    }, [user?.plan, router, user?.roles]);

    const isPlanFound = Boolean(user?.plan);
    const isPlanInctive =
        isPlanFound &&
        user?.plan?.status &&
        !([PlanStatus.active, PlanStatus.trialing] as string[]).includes(
            user?.plan.status
        );
    const planStatusMessage = isPlanInctive
        ? `Your plan is not active. Please contact support.`
        : undefined;
    const errorMessage = userError ?? planStatusMessage;
    const timedOut = !allowRefetch && !isPlanFound;
    const isLoading =
        (isLoadingUser || isRefetching || !isPlanFound) && !timedOut;
    return (
        <PageContainer>
            <InnerContent>
                <StepperContainer
                    currentStepIndex={2}
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
                            {timedOut ? (
                                <CenteredContainer fillSpace>
                                    <Header>
                                        It&apos;s taking a little longer than
                                        expected...
                                    </Header>
                                    <Paragraph>
                                        If you&apos;re still there, would you
                                        like to try again?
                                    </Paragraph>
                                    <Button
                                        onClick={() => {
                                            router.reload();
                                        }}
                                    >
                                        Try again
                                    </Button>
                                </CenteredContainer>
                            ) : (
                                <>
                                    {errorMessage ? (
                                        <Header>
                                            There seems to be an issue...
                                        </Header>
                                    ) : (
                                        <Header>Setup complete!</Header>
                                    )}
                                    {isPlanInctive && (
                                        <Paragraph>
                                            Your plan&apos;s status:{' '}
                                            {user?.plan?.status}
                                        </Paragraph>
                                    )}
                                </>
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
