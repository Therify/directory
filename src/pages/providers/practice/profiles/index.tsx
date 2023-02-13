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
import { Box } from '@mui/material';
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
import { ProviderProfile } from '@/lib/shared/types';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';

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
    const {
        data,
        error: trpcError,
        isLoading: isLoadingProfiles,
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
    const { profiles, errors } = data ?? {
        profiles: [] as ProviderProfile.ProviderProfile[],
        errors: [] as string[],
    };
    const isLoading = isLoadingUser || isLoadingProfiles;
    const [queryError] = errors;
    const errorMessage = trpcError?.message || queryError;
    const canCreateProfile =
        user?.plan?.seats !== undefined &&
        profiles &&
        profiles.length < user.plan.seats;

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
                                {!canCreateProfile && (
                                    <WarningRounded
                                        color="error"
                                        style={{
                                            marginRight: theme.spacing(3),
                                        }}
                                    />
                                )}
                                <SeatCount
                                    italic
                                    isOverPlanCapacity={!canCreateProfile}
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
                    {errorMessage && (
                        <Alert type="error" title={errorMessage} />
                    )}
                    <ListTitle>Provider Name</ListTitle>
                    {profiles.length === 0 && (
                        <Paragraph>No profiles.</Paragraph>
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
                                        <ProfileActions profile={profile} />
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
}: {
    profile: ProviderProfile.ProviderProfile & {
        directoryListing?: z.infer<typeof DirectoryListingSchema>;
    };
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
            onClick: () => {
                console.log('TODO: handle delete', profile.id);
            },
        },
        {
            text: 'Invite editor',
            icon: <AddRounded />,
            onClick: () => {
                console.log('TODO: handle invite', profile.id);
            },
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
