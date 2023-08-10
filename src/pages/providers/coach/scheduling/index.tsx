import { addDays, endOfDay, intervalToDuration, startOfDay } from 'date-fns';
import { useState, useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { CalendarMonthOutlined, Delete } from '@mui/icons-material';
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
    List,
    ListItem,
    FloatingList,
} from '@/lib/shared/components/ui';
import { Alerts } from '@/lib/modules/alerts/context';
import { SchedulerDrawer } from '@/lib/modules/scheduling/components';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function SchedulingPage({ user }: ProviderTherifyUserPageProps) {
    const { flags } = useFeatureFlags(user);
    const { createAlert } = useContext(Alerts.Context);
    const [showCalendarEmailModal, setShowCalendarEmailModal] = useState(false);
    const [showAvailability, setShowAvailability] = useState(false);
    const [removeCalendarEmail, setRemoveCalendarEmail] = useState<string>();
    const [isRedirectingToCalendarAuth, setIsRedirectingToCalendarAuth] =
        useState(false);

    const { mutate: generateAuthUrl, isLoading: isGeneratingAuthUrl } =
        trpc.useMutation('scheduling.generate-calendar-auth-url', {
            onSuccess: ({ authUrl, errors }) => {
                if (authUrl) {
                    createAlert({
                        type: 'success',
                        title: 'Redirecting to authorization',
                    });
                    setIsRedirectingToCalendarAuth(true);
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
                    title: 'There was an issue getting an authorization link.',
                });
            },
        });

    const {
        mutate: removeCalendarAccess,
        isLoading: isRemovingCalendarAccess,
    } = trpc.useMutation('scheduling.remove-calendar-access', {
        onSuccess: ({ success, errors }) => {
            if (success) {
                createAlert({
                    type: 'success',
                    title: 'Calendar access removed.',
                });
                refetchConnectedEmails();
                setRemoveCalendarEmail(undefined);
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
                title: 'There was an issue removing access.',
            });
        },
    });

    const {
        data: connectedEmailsData,
        isLoading: isFetchingConnectedEmails,
        refetch: refetchConnectedEmails,
    } = trpc.useQuery(
        [
            'scheduling.get-connected-calendar-emails',
            {
                userId: user?.userId ?? '',
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(user?.userId) && flags.isCoachSchedulingEnabled,
        }
    );
    const {
        data: availableTimeSlots,
        isLoading: isGettingAvailableTimeSlots,
        refetch: getAvilableTimeSlots,
    } = trpc.useQuery(
        [
            'scheduling.get-available-time-slots',
            {
                userId: user?.userId ?? '',
                startDate: startOfDay(addDays(new Date(), 1)).toISOString(),
                endDate: endOfDay(addDays(new Date(), 30)).toISOString(),
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: false,
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
    if (!user || !flags.isCoachSchedulingEnabled) {
        return (
            <CenteredContainer>Scheduling is not available</CenteredContainer>
        );
    }
    return (
        <ProviderNavigationPage
            currentPath="/providers/coach/scheduling"
            user={user}
        >
            <Box p={4} width="100%">
                <H3>Your connected calendars emails</H3>
                {!isFetchingConnectedEmails && (
                    <Button onClick={() => setShowCalendarEmailModal(true)}>
                        Connect Calendar
                    </Button>
                )}
                {!isFetchingConnectedEmails && (
                    <Button
                        type="outlined"
                        disabled={isGettingAvailableTimeSlots}
                        onClick={() => {
                            setShowAvailability(true);
                            if (!availableTimeSlots) {
                                getAvilableTimeSlots();
                            }
                        }}
                        sx={{ marginLeft: 2 }}
                    >
                        See Availability
                    </Button>
                )}
                {isFetchingConnectedEmails && (
                    <CenteredContainer padding={2} width="100%">
                        <CircularProgress />
                    </CenteredContainer>
                )}
                <Box py={2} width="100%">
                    <List sx={{ width: '100%' }}>
                        {connectedEmails.map(({ emailAddress }) => (
                            <ListItem
                                key={emailAddress}
                                leftSlot={<CalendarMonthOutlined />}
                                rightSlot={
                                    <FloatingList
                                        sx={{ marginLeft: 2 }}
                                        listItems={[
                                            {
                                                text: 'Remove Access to this calendar',
                                                icon: <Delete />,
                                                onClick: () => {
                                                    setRemoveCalendarEmail(
                                                        emailAddress
                                                    );
                                                },
                                            },
                                        ]}
                                    />
                                }
                            >
                                <Paragraph noMargin>{emailAddress}</Paragraph>
                            </ListItem>
                        ))}
                    </List>
                    {connectedEmails.length === 0 &&
                        !isFetchingConnectedEmails && (
                            <Paragraph>No connected calendars.</Paragraph>
                        )}
                </Box>
                {showCalendarEmailModal && !isFetchingConnectedEmails && (
                    <AddCalendarModal
                        connectedEmails={connectedEmails
                            .filter((e) => e.isValid)
                            .map(({ emailAddress }) => emailAddress)}
                        onClose={() => {
                            setShowCalendarEmailModal(false);
                        }}
                        isLoading={
                            isGeneratingAuthUrl || isRedirectingToCalendarAuth
                        }
                        createAuthUrl={createAuthUrl}
                    />
                )}
                {removeCalendarEmail && (
                    <RemoveCalendarModal
                        email={removeCalendarEmail}
                        onClose={() => {
                            setRemoveCalendarEmail(undefined);
                        }}
                        isLoading={isRemovingCalendarAccess}
                        removeAccess={() =>
                            removeCalendarAccess({
                                emailAddress: removeCalendarEmail,
                                userId: user.userId,
                            })
                        }
                    />
                )}

                <SchedulerDrawer
                    isOpen={showAvailability}
                    title="Availability"
                    onClose={() => setShowAvailability(false)}
                    onSchedule={(slot) =>
                        alert('scheduled slot: ' + slot.start)
                    }
                    timeSlots={
                        availableTimeSlots?.availability?.map((slot) => ({
                            start: new Date(slot.start),
                            duration: intervalToDuration(slot).minutes ?? 0,
                        })) ?? []
                    }
                    isLoading={isGettingAvailableTimeSlots}
                />
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
        formState: { errors, isValid: isEmailValid },
        control,
    } = useForm<{ emailAddress: string }>({
        mode: 'onChange',
    });

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

const RemoveCalendarModal = ({
    onClose,
    isLoading,
    email,
    removeAccess,
}: {
    email: string;
    onClose: () => void;
    isLoading: boolean;
    removeAccess: () => void;
}) => {
    return (
        <Modal
            showCloseButton={false}
            isOpen
            onClose={onClose}
            title="Remove Calendar Access"
            message={`Are you sure you want to remove access to the calendar associated with ${email}?`}
            postBodySlot={
                isLoading && (
                    <CenteredContainer padding={2} width="100%">
                        <CircularProgress />
                    </CenteredContainer>
                )
            }
            fullWidthButtons
            primaryButtonDisabled={isLoading}
            primaryButtonColor="error"
            primaryButtonText="Remove"
            primaryButtonOnClick={() => removeAccess()}
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={isLoading}
            secondaryButtonOnClick={onClose}
        />
    );
};
