import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    Caption,
    Badge,
    BADGE_COLOR,
    BADGE_SIZE,
    Avatar,
    AVATAR_SIZE,
    FloatingList,
    H1,
    List,
    ListItem,
    Modal,
    Paragraph,
    PageContentContainer,
    LoadingContainer,
    Alert,
    Input,
    CenteredContainer,
    Divider,
    FormValidation,
    IconButton,
} from '@/lib/shared/components/ui';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { useEffect, useRef, useState } from 'react';
import { InvitationStatus, ListingStatus, Role } from '@prisma/client';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Link, useMediaQuery } from '@mui/material';
import {
    EditRounded,
    DeleteRounded,
    WarningRounded,
    VisibilityOffRounded,
    CancelRounded,
    VisibilityRounded,
    SendRounded,
    AddRounded,
    PersonAddAlt1Rounded,
    MailRounded,
    AccountCircleOutlined,
} from '@mui/icons-material';
import { trpc } from '@/lib/shared/utils/trpc';
import { ProviderProfileListing } from '@/lib/shared/types';
import {
    ListPracticeProfilesByUserId,
    DeleteProviderProfile,
} from '@/lib/modules/providers/features/profiles';
import {
    CreatePracticeProviderInvitation,
    DeletePracticeProviderInvitation,
} from '@/lib/modules/providers/features/invitations';
import { ProvidersService } from '@/lib/modules/providers/service';
import { PracticeProfilesPageProps } from '@/lib/modules/providers/service/page-props/get-practice-profiles-page-props/getPracticeProfilesPageProps';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getPracticeProfilesPageProps,
    })
);

export default function PracticeProfilesPage({
    user,
    practice,
    profiles: loadedProfiles,
}: PracticeProfilesPageProps) {
    const router = useRouter();
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));
    const [invitationProfile, setInvitationProfile] =
        useState<ProviderProfileListing.Type>();
    const [invitationToDelete, setInvitationToDelete] =
        useState<ProviderProfileListing.Type>();
    const [profileToDelete, setProfileToDelete] =
        useState<ProviderProfileListing.Type>();

    const {
        data: refetchedProfilesData,
        isLoading: isLoadingProfiles,
        error: trpcError,
        refetch: refetchProfiles,
        isRefetching: isRefetchingProfiles,
    } = trpc.useQuery(
        [
            `providers.${ListPracticeProfilesByUserId.TRPC_ROUTE}`,
            {
                userId: user?.userId,
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    const { mutate: deleteProfile, isLoading: isDeletingProfile } =
        trpc.useMutation(`providers.${DeleteProviderProfile.TRPC_ROUTE}`, {
            onSuccess: ({ success, errors }) => {
                if (success) {
                    refetchProfiles();
                    setProfileToDelete(undefined);
                }
                const [error] = errors;
                if (error) {
                    console.error(error);
                }
            },
        });

    const { mutate: createInvitation, isLoading: isCreatingInvitation } =
        trpc.useMutation(
            `providers.${CreatePracticeProviderInvitation.TRPC_ROUTE}`,
            {
                onSuccess: ({ invitationId, errors }) => {
                    if (invitationId) {
                        refetchProfiles();
                        setInvitationProfile(undefined);
                    }
                    const [error] = errors;
                    if (error) {
                        console.error(error);
                    }
                },
            }
        );
    const { mutate: deleteInvitation, isLoading: isDeletingInvitation } =
        trpc.useMutation(
            `providers.${DeletePracticeProviderInvitation.TRPC_ROUTE}`,
            {
                onSuccess: ({ success, errors }) => {
                    if (success) {
                        refetchProfiles();
                        setInvitationToDelete(undefined);
                    }
                    const [error] = errors;
                    if (error) {
                        console.error(error);
                    }
                },
            }
        );

    const { profiles, errors } = refetchedProfilesData ?? {
        profiles: loadedProfiles ?? [],
        errors: [] as string[],
    };
    const isLoading = isLoadingProfiles || isRefetchingProfiles;
    const [queryError] = errors;
    const errorMessage = trpcError?.message || queryError;
    const canCreateProfile =
        user?.plan?.seats !== undefined &&
        profiles &&
        profiles.length < user.plan.seats;
    const isOverPlanCapacity =
        user?.plan?.seats !== undefined &&
        profiles &&
        profiles.length > user.plan.seats;

    useEffect(() => {
        if (user?.isPracticeAdmin === false) {
            const isTherapist = user.roles.includes(Role.provider_therapist);
            isTherapist
                ? router.push(URL_PATHS.PROVIDERS.THERAPIST.DASHBOARD)
                : router.push(URL_PATHS.PROVIDERS.COACH.DASHBOARD);
        }
    }, [router, user?.isPracticeAdmin, user?.roles]);

    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.PRACTICE.PROFILES}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...PRACTICE_ADMIN_MAIN_MENU]}
            secondaryMenu={[...PRACTICE_ADMIN_SECONDARY_MENU]}
            mobileMenu={[...PRACTICE_ADMIN_MOBILE_MENU]}
        >
            <LoadingContainer isLoading={isLoading}>
                <PageContentContainer
                    fillContentSpace
                    paddingX={0}
                    paddingY={8}
                >
                    <TitleContainer>
                        <Box>
                            <Title>Profiles</Title>

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-start"
                            >
                                {isOverPlanCapacity && (
                                    <WarningRounded
                                        color="error"
                                        style={{
                                            marginRight: theme.spacing(3),
                                        }}
                                    />
                                )}
                                <SeatCount
                                    italic
                                    isOverPlanCapacity={isOverPlanCapacity}
                                >
                                    {profiles.length}{' '}
                                    {user?.plan?.seats &&
                                        ` of ${user.plan.seats}`}{' '}
                                    profiles active for your practice.
                                </SeatCount>
                            </Box>
                        </Box>
                        <Box className="admin-controls">
                            {canCreateProfile &&
                                (isMobileWidth ? (
                                    <IconButton
                                        onClick={() =>
                                            router.push(
                                                URL_PATHS.PROVIDERS.PRACTICE
                                                    .PROFILES_CREATE
                                            )
                                        }
                                    >
                                        <AddRounded />
                                    </IconButton>
                                ) : (
                                    <Button
                                        startIcon={<AddRounded />}
                                        onClick={() =>
                                            router.push(
                                                URL_PATHS.PROVIDERS.PRACTICE
                                                    .PROFILES_CREATE
                                            )
                                        }
                                    >
                                        New Profile
                                    </Button>
                                ))}
                        </Box>
                    </TitleContainer>
                    <ListTitle>Provider Name</ListTitle>
                    {errorMessage && (
                        <Box width="100%" marginTop={4}>
                            <Alert type="error" title={errorMessage} />
                        </Box>
                    )}
                    {profiles.length === 0 && !errorMessage && (
                        <Box marginLeft={5} marginTop={4}>
                            <Paragraph>
                                No profiles to show.{' '}
                                {canCreateProfile && (
                                    <Link
                                        aria-label="Create a profile"
                                        href={
                                            URL_PATHS.PROVIDERS.PRACTICE
                                                .PROFILES_CREATE
                                        }
                                    >
                                        Create one!
                                    </Link>
                                )}
                            </Paragraph>
                        </Box>
                    )}
                    <ProfileList>
                        {profiles.map((profile) => {
                            const name =
                                `${profile.givenName} ${profile.surname}`.trim();
                            return (
                                <ListItem
                                    key={profile.id}
                                    onClick={() =>
                                        router.push(
                                            `${URL_PATHS.PROVIDERS.PRACTICE.PROFILE_EDITOR}/${profile.id}`
                                        )
                                    }
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Avatar
                                                src={
                                                    profile.profileImageUrl ??
                                                    '#'
                                                }
                                                size={AVATAR_SIZE.EXTRA_SMALL}
                                                sx={{ mr: 4 }}
                                            />
                                            <Paragraph
                                                noMargin
                                                sx={{
                                                    fontWeight: 500,
                                                    marginRight:
                                                        theme.spacing(4),
                                                }}
                                            >
                                                {name}
                                            </Paragraph>
                                            {!isMobileWidth && (
                                                <Badges profile={profile} />
                                            )}
                                        </Box>
                                        <ProfileActions
                                            isMobileWidth={isMobileWidth}
                                            profile={profile}
                                            onDelete={() =>
                                                setProfileToDelete(profile)
                                            }
                                            onListingButtonClick={() =>
                                                profile.directoryListing
                                                    .status ===
                                                ListingStatus.listed
                                                    ? router.push(
                                                          `${URL_PATHS.DIRECTORY.ROOT}/${profile.id}`
                                                      )
                                                    : console.log(
                                                          'TODO: Publish profile to directory ',
                                                          profile
                                                      )
                                            }
                                            onEdit={() =>
                                                router.push(
                                                    `${URL_PATHS.PROVIDERS.PRACTICE.PROFILE_EDITOR}/${profile.id}`
                                                )
                                            }
                                            onCancelInvitation={() =>
                                                setInvitationToDelete(profile)
                                            }
                                            onInvite={() =>
                                                setInvitationProfile(profile)
                                            }
                                        />
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </ProfileList>
                </PageContentContainer>
            </LoadingContainer>

            {profileToDelete && (
                <DeleteProfileModal
                    profile={profileToDelete}
                    onClose={() => setProfileToDelete(undefined)}
                    onDelete={() =>
                        deleteProfile({
                            profileId: profileToDelete.id!,
                            userId: user?.userId!,
                        })
                    }
                    isDeleting={isDeletingProfile}
                />
            )}
            {invitationProfile && user && (
                <InvitationModal
                    profile={invitationProfile}
                    onClose={() => setInvitationProfile(undefined)}
                    isLoading={isCreatingInvitation}
                    onInvite={(recipientEmail: string) =>
                        createInvitation({
                            recipientEmail,
                            expiresInDays: 7,
                            senderId: user.userId,
                            profileId: invitationProfile.id,
                            practiceId: practice.id,
                            designation: invitationProfile.designation,
                        })
                    }
                />
            )}
            {invitationToDelete && (
                <DeleteInvitaionModal
                    profile={invitationToDelete}
                    onClose={() => setInvitationToDelete(undefined)}
                    isDeleting={isDeletingInvitation}
                    onDelete={() =>
                        deleteInvitation({
                            invitationId: invitationToDelete.invitation!.id!,
                            userId: user?.userId!,
                        })
                    }
                />
            )}
        </SideNavigationPage>
    );
}

const ListTitle = styled(Paragraph)(({ theme }) => ({
    ...theme.typography.caption,
    fontWeight: 500,
    marginLeft: theme.spacing(5),
    marginBottom: 0,
    color: theme.palette.text.secondary,
}));

const SeatCount = styled(Caption, {
    shouldForwardProp: (prop) => prop !== 'isOverPlanCapacity',
})<{ isOverPlanCapacity: boolean }>(({ theme, isOverPlanCapacity }) => ({
    color: isOverPlanCapacity ? theme.palette.error.main : undefined,
    margin: 0,
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    '& > *:not(:last-child)': {
        marginRight: theme.spacing(2),
    },
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    marginBottom: theme.spacing(1),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(0, 5),
    marginBottom: theme.spacing(10),
    '& div:first-of-type': {
        flex: 1,
    },
    '& div.admin-controls': {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
const ListingButton = styled(Button)(({ theme }) => ({
    display: 'none',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'inherit',
    },
}));

const ProfileList = styled(List)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
}));

const getProfileStatusBadge = (status?: ListingStatus) => {
    switch (status) {
        case ListingStatus.listed:
            return {
                text: 'Listed',
                color: BADGE_COLOR.SUCCESS,
            };
        case ListingStatus.pending:
            return { text: 'Pending Review', color: BADGE_COLOR.WARNING };
        case ListingStatus.unlisted:
        default:
            return { text: 'Unlisted', color: BADGE_COLOR.ERROR };
    }
};

const InvitationModal = ({
    profile,
    onClose,
    onInvite,
    isLoading,
}: {
    onClose: () => void;
    onInvite: (email: string) => void;
    profile: ProviderProfileListing.Type;
    isLoading: boolean;
}) => {
    const emailValidationUrl = URL_PATHS.API.ACCOUNTS.IS_EMAIL_UNIQUE;
    const [emailAddress, setEmailAddress] = useState('');
    const [emailsCheckedForUniqueness, setEmailsCheckedForUniqueness] =
        useState<Record<string, boolean>>({});
    const debounceRef = useRef<number>();
    const isEmailUnique = !!emailsCheckedForUniqueness[emailAddress];
    const emailErrorMessage =
        emailAddress.trim() === '' || isEmailUnique
            ? undefined
            : 'Email is already registered with Therify.';

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

    return (
        <Modal
            isOpen
            onClose={onClose}
            title="Profile Invitation"
            message={
                isLoading
                    ? 'Sending invite to ' + emailAddress
                    : `Invite a provider to claim ${profile.givenName} ${profile.surname}'s profile. This will allow both you and the provider to edit this profile.`
            }
            fullWidthButtons
            primaryButtonDisabled={
                isLoading ||
                !FormValidation.isValidEmail(emailAddress) ||
                !isEmailUnique
            }
            primaryButtonText="Invite"
            primaryButtonOnClick={() => onInvite(emailAddress)}
            primaryButtonEndIcon={<SendRounded />}
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={isLoading}
            secondaryButtonOnClick={onClose}
            postBodySlot={
                isLoading ? (
                    <CenteredContainer>
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <Box width="100%">
                        <Input
                            required
                            fullWidth
                            placeholder="Recipient email"
                            errorMessage={
                                emailAddress !== '' &&
                                !FormValidation.isValidEmail(emailAddress)
                                    ? 'Email is invalid'
                                    : emailErrorMessage
                            }
                            onChange={(e) => setEmailAddress(e.target.value)}
                            value={emailAddress}
                        />
                    </Box>
                )
            }
        />
    );
};
const DeleteInvitaionModal = ({
    profile,
    onClose,
    onDelete,
    isDeleting,
}: {
    onClose: () => void;
    onDelete: () => void;
    profile: ProviderProfileListing.Type;
    isDeleting: boolean;
}) => {
    return (
        <Modal
            isOpen
            onClose={onClose}
            title="Cancel Invitation"
            message={
                isDeleting
                    ? 'Deleting invitation'
                    : `Are you sure yout want to cancel the invitation sent to ${profile.invitation?.recipientEmail}?`
            }
            fullWidthButtons
            primaryButtonText="Cancel Invite"
            primaryButtonColor="error"
            primaryButtonOnClick={onDelete}
            primaryButtonEndIcon={<CancelRounded />}
            secondaryButtonText="Back"
            secondaryButtonDisabled={isDeleting}
            secondaryButtonOnClick={onClose}
            postBodySlot={
                isDeleting ? (
                    <CenteredContainer>
                        <CircularProgress />
                    </CenteredContainer>
                ) : undefined
            }
        />
    );
};
const DeleteProfileModal = ({
    profile,
    onClose,
    onDelete,
    isDeleting,
}: {
    onClose: () => void;
    onDelete: () => void;
    profile: ProviderProfileListing.Type;
    isDeleting: boolean;
}) => {
    const [value, setValue] = useState('');
    const providerName = `${profile.givenName} ${profile.surname}`.trim();

    return (
        <Modal
            isOpen
            onClose={onClose}
            title="Delete Profile"
            message={
                isDeleting
                    ? 'Deleting profile'
                    : `Are you sure yout want to delete ${providerName}'s profile? This cannot be undone.`
            }
            fullWidthButtons
            primaryButtonDisabled={isDeleting || value !== providerName}
            primaryButtonText="Delete"
            primaryButtonColor="error"
            primaryButtonOnClick={onDelete}
            primaryButtonEndIcon={<DeleteRounded />}
            secondaryButtonText="Cancel"
            secondaryButtonDisabled={isDeleting}
            secondaryButtonOnClick={onClose}
            postBodySlot={
                isDeleting ? (
                    <CenteredContainer>
                        <CircularProgress />
                    </CenteredContainer>
                ) : (
                    <Box width="100%">
                        <Divider />
                        <Input
                            required
                            fullWidth
                            label={`Type "${providerName}" to continue`}
                            placeholder={providerName}
                            error={value !== '' && value !== providerName}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </Box>
                )
            }
        />
    );
};

const getListingAction = (status?: ListingStatus) => {
    switch (status) {
        case ListingStatus.listed:
            return {
                text: 'Delist Profile',
                icon: <VisibilityOffRounded />,
                onClick: () => {
                    console.log('TODO: handle deactivate');
                },
            };
        case ListingStatus.pending:
            return {
                text: 'Cancel Review',
                icon: <CancelRounded />,
                onClick: () => {
                    console.log('TODO: handle cancel review');
                },
            };
        case ListingStatus.unlisted:
        default:
            return {
                text: 'Publish Profile',
                icon: <VisibilityRounded />,
                onClick: () => {
                    console.log('TODO: handle activate');
                },
            };
    }
};

const getInvitationAction = ({
    status,
    invite,
    cancel,
}: {
    status?: InvitationStatus;
    invite: () => void;
    cancel: () => void;
}) => {
    switch (status) {
        case InvitationStatus.pending:
            return {
                text: 'Cancel Invitation',
                icon: <CancelRounded />,
                onClick: cancel,
            };
        default:
            return {
                text: 'Invite editor',
                icon: <PersonAddAlt1Rounded />,
                onClick: invite,
            };
    }
};
const Badges = ({ profile }: { profile: ProviderProfileListing.Type }) => {
    const { text: listingText, color: listingBadgeColor } =
        getProfileStatusBadge(profile.directoryListing.status);
    return (
        <BadgeContainer>
            <Badge
                icon={
                    profile.directoryListing.status === ListingStatus.listed ? (
                        <VisibilityRounded />
                    ) : (
                        <VisibilityOffRounded />
                    )
                }
                size={BADGE_SIZE.SMALL}
                color={listingBadgeColor}
            >
                {listingText}
            </Badge>
            {profile.invitation && (
                <Badge
                    icon={
                        profile.invitation.status ===
                        InvitationStatus.pending ? (
                            <MailRounded />
                        ) : (
                            <AccountCircleOutlined />
                        )
                    }
                    size={BADGE_SIZE.SMALL}
                    color={
                        profile.invitation.status === InvitationStatus.pending
                            ? 'warning'
                            : 'success'
                    }
                >
                    {profile.invitation.status === InvitationStatus.pending
                        ? 'Invitation Sent'
                        : 'Profile Claimed'}
                </Badge>
            )}
        </BadgeContainer>
    );
};
const BadgeIcons = ({ profile }: { profile: ProviderProfileListing.Type }) => {
    const { text: listingText, color: listingBadgeColor } =
        getProfileStatusBadge(profile.directoryListing.status);
    return (
        <BadgeContainer>
            <Badge size={BADGE_SIZE.SMALL} color={listingBadgeColor}>
                <CenteredContainer width="20px" height="20px">
                    {profile.directoryListing.status ===
                    ListingStatus.listed ? (
                        <VisibilityRounded />
                    ) : (
                        <VisibilityOffRounded />
                    )}
                </CenteredContainer>
            </Badge>
            {profile.invitation && (
                <Badge
                    size={BADGE_SIZE.SMALL}
                    color={
                        profile.invitation.status === InvitationStatus.pending
                            ? 'warning'
                            : 'success'
                    }
                >
                    <CenteredContainer width="20px" height="20px">
                        {profile.invitation.status ===
                        InvitationStatus.pending ? (
                            <MailRounded />
                        ) : (
                            <AccountCircleOutlined />
                        )}
                    </CenteredContainer>
                </Badge>
            )}
        </BadgeContainer>
    );
};
const ProfileActions = ({
    profile,
    isMobileWidth,
    onListingButtonClick,
    onEdit,
    onDelete,
    onInvite,
    onCancelInvitation,
}: {
    isMobileWidth: boolean;
    profile: ProviderProfileListing.Type;
    onListingButtonClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onInvite: () => void;
    onCancelInvitation: () => void;
}) => {
    const theme = useTheme();
    const moreItems = [
        {
            text: 'Edit',
            icon: <EditRounded />,
            onClick: onEdit,
        },
        {
            text: 'Delete',
            icon: <DeleteRounded />,
            onClick: onDelete,
        },
        ...(profile.invitation?.status !== InvitationStatus.accepted
            ? [
                  getInvitationAction({
                      status: profile.invitation?.status,
                      invite: onInvite,
                      cancel: onCancelInvitation,
                  }),
              ]
            : []),
        getListingAction(profile.directoryListing?.status),
    ];
    return (
        <Box display="flex" justifyContent="flex-end">
            <Box
                display="flex"
                alignItems="center"
                onClick={(event) => event.stopPropagation()}
            >
                {!isMobileWidth && (
                    <>
                        <ListingButton
                            type={BUTTON_TYPE.OUTLINED}
                            size={BUTTON_SIZE.SMALL}
                            color="info"
                            onClick={onListingButtonClick}
                        >
                            {profile.directoryListing.status ===
                            ListingStatus.unlisted
                                ? 'Publish to directory'
                                : 'View'}
                        </ListingButton>
                    </>
                )}
                {isMobileWidth && <BadgeIcons profile={profile} />}
                <FloatingList
                    headerSlot={isMobileWidth && <Badges profile={profile} />}
                    listItems={moreItems}
                    sx={{ marginLeft: theme.spacing(4) }}
                />
            </Box>
        </Box>
    );
};
