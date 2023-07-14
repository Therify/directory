import { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { trpc } from '@/lib/shared/utils/trpc';
import { URL_PATHS } from '@/lib/sitemap';
import { ProviderTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';
import {
    Button,
    Input,
    Modal,
    FormValidation,
    CenteredContainer,
    Paragraph,
    H3,
} from '@/lib/shared/components/ui';
import { Alerts } from '@/lib/modules/alerts/context';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function SchedulingPage({ user }: ProviderTherifyUserPageProps) {
    const { flags } = useFeatureFlags(user);
    const { createAlert } = useContext(Alerts.Context);
    const [showCalendarEmailModal, setShowCalendarEmailModal] = useState(false);

    const { mutate: generateAuthUrl, isLoading: isGeneratingAuthUrl } =
        trpc.useMutation('scheduling.generate-calendar-auth-url', {
            onSuccess: ({ authUrl, errors }) => {
                console.log({ authUrl, errors });
                if (authUrl) {
                    createAlert({
                        type: 'success',
                        title: 'Redirecting to authorization',
                    });
                    window.location.href = authUrl;
                    return;
                }
                const [error] = errors;
                if (error) {
                    console.error(error);
                    createAlert({
                        type: 'error',
                        title: error,
                    });
                }
            },
            onError: (error) => {
                console.error(error);
                if (error instanceof Error) {
                    return createAlert({
                        type: 'error',
                        title: error.message,
                    });
                }
                createAlert({
                    type: 'error',
                    title: 'There was an getting an authorization link.',
                });
            },
        });

    const { data: connectedEmailsData, isLoading: isFetchingConnectedEmails } =
        trpc.useQuery(
            [
                'scheduling.get-connected-calendar-emails',
                {
                    userId: user.userId,
                },
            ],
            {
                refetchOnWindowFocus: false,
                enabled: Boolean(user.userId),
            }
        );
    const connectedEmails = connectedEmailsData?.calendarEmails ?? [];
    const createAuthUrl = (emailAddress: string) => {
        generateAuthUrl({
            emailAddress,
            successUrl:
                window.location.origin +
                URL_PATHS.PROVIDERS.COACH.SCHEDULING.AUTH_SUCCESS,
        });
    };
    if (!user) {
        return <div>Scheduling is not available</div>;
    }
    return (
        <ProviderNavigationPage
            currentPath="/providers/coach/scheduling"
            user={user}
        >
            <Box>
                {!isFetchingConnectedEmails && (
                    <Button onClick={() => setShowCalendarEmailModal(true)}>
                        Connect Calendar
                    </Button>
                )}
                <H3>Your connected calendars emails</H3>
                {isFetchingConnectedEmails && (
                    <CenteredContainer padding={2} width="100%">
                        <CircularProgress />
                    </CenteredContainer>
                )}
                {connectedEmails?.map(({ emailAddress }) => (
                    <Paragraph key={emailAddress}>{emailAddress}</Paragraph>
                ))}
                {showCalendarEmailModal && !isFetchingConnectedEmails && (
                    <AddCalendarModal
                        connectedEmails={['jessie@therify.co']}
                        onClose={() => {
                            setShowCalendarEmailModal(false);
                        }}
                        isLoading={isGeneratingAuthUrl}
                        createAuthUrl={createAuthUrl}
                    />
                )}
            </Box>
        </ProviderNavigationPage>
    );
}

const AddCalendarModal = ({
    onClose,
    isLoading,
    createAuthUrl,
    connectedEmails = [],
}: {
    connectedEmails: string[];
    onClose: () => void;
    isLoading: boolean;
    createAuthUrl: (email: string) => void;
}) => {
    const {
        getValues,
        setValue,
        watch,
        formState: { errors, isValid: isEmailValid },
        control,
    } = useForm<{ emailAddress: string }>({
        mode: 'onChange',
    });
    const email = watch('emailAddress');

    return (
        <Modal
            showCloseButton={false}
            isOpen
            onClose={onClose}
            title="Connect a Calendar"
            message="To connect a calendar, enter the email address associated with your calendar. You will be redireced to grant Therify to access your calendar."
            postBodySlot={
                isLoading ? (
                    <CenteredContainer padding={2} width="100%">
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <Controller
                        control={control}
                        name="emailAddress"
                        rules={{
                            required: {
                                value: true,
                                message: 'Email is required.',
                            },
                            validate: {
                                emailNotAlreadyConnected: (email) =>
                                    connectedEmails.includes(
                                        email.trim().toLowerCase()
                                    )
                                        ? 'Email is already connected.'
                                        : true,
                                [FormValidation.EmailValidationType.IsValid]: (
                                    email
                                ) =>
                                    FormValidation.isValidEmail(email)
                                        ? true
                                        : 'Email is invalid.',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error, isTouched },
                        }) => (
                            <Input
                                fullWidth
                                required
                                id="emailAddress"
                                label="Email"
                                errorMessage={
                                    isTouched ? error?.message : undefined
                                }
                                autoComplete="email"
                                type="email"
                                disabled={isLoading}
                                {...{
                                    onChange,
                                    onBlur,
                                    value,
                                    name,
                                }}
                            />
                        )}
                    />
                )
            }
            fullWidthButtons
            primaryButtonDisabled={!isEmailValid}
            primaryButtonText="Connect Calendar"
            primaryButtonOnClick={() =>
                createAuthUrl(getValues('emailAddress'))
            }
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={isLoading}
            secondaryButtonOnClick={onClose}
        />
    );
};
