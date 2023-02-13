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
} from '@/lib/shared/components/ui';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/shared/hooks';
import { RBAC } from '@/lib/shared/utils';
import { useEffect, useState } from 'react';
import { ListingStatus, Role } from '@prisma/client';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Link } from '@mui/material';
import {
    EditRounded,
    DeleteRounded,
    AddRounded,
    WarningRounded,
    VisibilityOffRounded,
    CancelRounded,
    VisibilityRounded,
    SendRounded,
    AddCircleOutlineRounded,
} from '@mui/icons-material';
import { DirectoryListingSchema } from '@/lib/shared/schema';
import { z } from 'zod';
import { trpc } from '@/lib/shared/utils/trpc';
import { ProviderProfileListing } from '@/lib/shared/types';
import {
    ListPracticeProfilesByUserId,
    DeleteProviderProfile,
} from '@/lib/modules/providers/features/profiles';
import { error } from '@/lib/shared/components/themes/therify-design-system/colors';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);
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

export default function PracticeProfilesPage() {
    const { user, isLoading: isLoadingUser } = useTherifyUser();
    const router = useRouter();
    const theme = useTheme();
    const [showNewProfileModal, setShowNewProfileModal] = useState(false);
    const [profileToDelete, setProfileToDelete] =
        useState<ProviderProfileListing.Type>();
    const {
        data,
        error: trpcError,
        isLoading: isLoadingProfiles,
        refetch: refetchProfiles,
        isRefetching: isRefetchingProfiles,
    } = trpc.useQuery(
        [
            `providers.${ListPracticeProfilesByUserId.TRPC_ROUTE}`,
            {
                userId: user?.userId ?? '',
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(user?.userId),
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

    const { profiles, errors } = data ?? {
        profiles: [] as ProviderProfileListing.Type[],
        errors: [] as string[],
    };
    const isLoading =
        isLoadingUser || isLoadingProfiles || isRefetchingProfiles;
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
            isLoadingUser={isLoadingUser}
        >
            <LoadingContainer isLoading={isLoading}>
                <PageContentContainer
                    fillContentSpace
                    paddingX={4}
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
                            {canCreateProfile && (
                                <Button
                                    onClick={() => setShowNewProfileModal(true)}
                                >
                                    New Profile
                                </Button>
                            )}
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
                                        aria-label="Create a new profile"
                                        onClick={() =>
                                            setShowNewProfileModal(true)
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
                            const { text: badgeText, color: badgeColor } =
                                getProfileStatusBadge(
                                    // TODO: Add directory listing to preview profile type
                                    // profile.directoryListing?.status
                                    undefined
                                );
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
                                            <Badge
                                                size={BADGE_SIZE.SMALL}
                                                color={badgeColor}
                                            >
                                                {badgeText}
                                            </Badge>
                                        </Box>
                                        <ProfileActions
                                            profile={profile}
                                            onDelete={() =>
                                                setProfileToDelete(profile)
                                            }
                                            onInvite={() =>
                                                console.log(
                                                    'TODO: invite provider for provile: ',
                                                    profile
                                                )
                                            }
                                        />
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </ProfileList>
                </PageContentContainer>
            </LoadingContainer>

            {canCreateProfile && (
                <Modal
                    isOpen={showNewProfileModal}
                    onClose={() => setShowNewProfileModal(false)}
                    title="Create New Profile"
                    message="How would you like to create a profile?"
                    fullWidthButtons
                    shouldStackButtons
                    primaryButtonText="Fill out the profile myself"
                    primaryButtonOnClick={() => {
                        router.push(
                            URL_PATHS.PROVIDERS.PRACTICE.PROFILES_CREATE
                        );
                    }}
                    primaryButtonEndIcon={<AddCircleOutlineRounded />}
                    secondaryButtonText="Invite a provider to create their profile"
                    secondaryButtonOnClick={() => {
                        router.push(
                            URL_PATHS.PROVIDERS.PRACTICE.PROVIDER_INVITE
                        );
                    }}
                    secondaryButtonEndIcon={<SendRounded />}
                />
            )}
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
                text: 'List Profile',
                icon: <VisibilityRounded />,
                onClick: () => {
                    console.log('TODO: handle activate');
                },
            };
    }
};

const ProfileActions = ({
    profile,
    onDelete,
    onInvite,
}: {
    profile: ProviderProfileListing.Type & {
        directoryListing?: z.infer<typeof DirectoryListingSchema>;
    };
    onDelete: () => void;
    onInvite: () => void;
}) => {
    const router = useRouter();
    const theme = useTheme();
    const moreItems = [
        {
            text: 'Edit',
            icon: <EditRounded />,
            onClick: () =>
                router.push(
                    `${URL_PATHS.PROVIDERS.PRACTICE.PROFILE_EDITOR}/${profile.id}`
                ),
        },
        {
            text: 'Delete',
            icon: <DeleteRounded />,
            onClick: onDelete,
        },
        {
            text: 'Invite editor',
            icon: <AddRounded />,
            onClick: onInvite,
        },
        getListingAction(profile.directoryListing?.status),
    ];
    return (
        <Box display="flex" justifyContent="flex-end">
            <Box
                display="flex"
                alignItems="center"
                onClick={(event) => event.stopPropagation()}
            >
                <Button
                    type={BUTTON_TYPE.OUTLINED}
                    size={BUTTON_SIZE.SMALL}
                    color="info"
                    onClick={() =>
                        router.push(`${URL_PATHS.DIRECTORY.ROOT}/${profile.id}`)
                    }
                    style={{ marginRight: theme.spacing(4) }}
                >
                    View
                </Button>
                <FloatingList
                    listItems={moreItems}
                    sx={{ marginLeft: theme.spacing(4) }}
                />
            </Box>
        </Box>
    );
};

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    marginBottom: theme.spacing(1),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(10),
    '& div:first-of-type': {
        flex: 1,
    },
    '& div.admin-controls': {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

const ProfileList = styled(List)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
}));
