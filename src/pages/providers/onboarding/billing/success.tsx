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
import { useUser } from '@auth0/nextjs-auth0/client';
import { PlanStatus } from '@prisma/client';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';

export const getServerSideProps = withPageAuthRequired();

const REGISTRATION_STEPS = ['Registration', 'Payment', 'Onboarding'] as const;
const SIXTY_SECONDS = 1000 * 60;

export default function BillingSuccessPage() {
    const { isLoading: isLoadingAuth0User, user: auth0User } = useUser();
    const router = useRouter();
    const { clearStorage } = usePracticeOnboardingStorage();
    const [allowRefetch, setAllowRefetch] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(clearStorage, [clearStorage]);
    const timeoutRef = useRef<number>();

    useEffect(() => {
        timeoutRef.current = window.setTimeout(() => {
            setAllowRefetch(false);
            return () => window.clearTimeout(timeoutRef.current);
        }, SIXTY_SECONDS);
        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const {
        user,
        errorMessage: getTherifyUserError,
        isLoading: isLoadingTherifyUser,
        isRefetching,
    } = useTherifyUser(auth0User?.sub, {
        refetchInterval: Boolean(allowRefetch && !userLoaded)
            ? 2000
            : undefined,
    });

    useEffect(() => {
        if (user) {
            setUserLoaded(true);
            window.clearTimeout(timeoutRef.current);
        }
    }, [user]);

    useEffect(() => {
        if (
            user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing
        ) {
            router.push(
                // TODO: Determine where next step are
                user.plan.seats > 1
                    ? URL_PATHS.PROVIDERS.ONBOARDING.INVITATIONS
                    : '/'
            );
        }
    }, [user?.plan, router]);

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
    const errorMessage = getTherifyUserError ?? planStatusMessage;
    const timedOut = !allowRefetch && !isPlanFound;
    const isLoading =
        (isLoadingAuth0User ||
            isLoadingTherifyUser ||
            isRefetching ||
            !isPlanFound) &&
        !timedOut;
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
