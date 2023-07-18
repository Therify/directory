import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    FormContainer,
    StepperContainer,
    LoadingContainer,
    H1,
    Caption,
    CenteredContainer,
    Button,
} from '@/lib/shared/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { trpc } from '@/lib/shared/utils/trpc';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function CalendarAuthSuccessPage({
    user,
}: ProviderTherifyUserPageProps) {
    const router = useRouter();
    const [hasSentCode, setHasSentCode] = useState(false);
    const { code: rawCode } = router.query;
    const code: string | undefined = Array.isArray(rawCode)
        ? rawCode.join('')
        : rawCode;
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        code ? undefined : 'No calendar code was provided.'
    );
    const { mutate: handleCalendarAuthCode, isLoading } = trpc.useMutation(
        'scheduling.handle-calendar-auth-code',
        {
            onSuccess: ({ success, errors }) => {
                if (success) {
                    router.push(URL_PATHS.PROVIDERS.COACH.SCHEDULING.ROOT);
                    return;
                }
                const [error] = errors;
                setErrorMessage(error);
            },
            onError: (error) => {
                console.error(error);
                if (error instanceof Error) {
                    return setErrorMessage(error.message);
                }
                setErrorMessage(
                    'There was an error validating your code. If this continues, please reach out for support.'
                );
            },
        }
    );
    useEffect(() => {
        if (code && user?.userId) {
            handleCalendarAuthCode({ code, userId: user.userId });
            setHasSentCode(true);
        }
    }, [code, handleCalendarAuthCode, user?.userId]);
    if (!user) {
        return null;
    }

    return (
        <PageContainer>
            <InnerContent>
                <StepperContainer currentStepIndex={2} steps={[]}>
                    <FormContainer errorMessage={errorMessage}>
                        <LoadingContainer
                            isLoading={
                                isLoading || (!hasSentCode && !errorMessage)
                            }
                            loadingTopSlot={
                                <Header>Connecting your calendar...</Header>
                            }
                        >
                            {errorMessage ? (
                                <CenteredContainer sx={{ mb: 4 }}>
                                    <Header>
                                        There seems to be an issue...
                                    </Header>
                                    <Button
                                        onClick={() =>
                                            router.push(
                                                URL_PATHS.PROVIDERS.COACH
                                                    .SCHEDULING.ROOT
                                            )
                                        }
                                    >
                                        Go back and try again
                                    </Button>
                                </CenteredContainer>
                            ) : (
                                hasSentCode && (
                                    <Header>Calendar connected!</Header>
                                )
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
