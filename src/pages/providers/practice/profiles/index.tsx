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
    Paragraph,
    PageContentContainer,
} from '@/components/ui';
import { SideNavigationPage } from '@/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';
import { RBAC } from '@/lib/utils';
import { useEffect } from 'react';
import {
    DirectoryListing,
    ListingStatus,
    ProviderProfile,
    Role,
} from '@prisma/client';
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
} from '@mui/icons-material';

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
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    const theme = useTheme();
    const profiles: (ProviderProfile & {
        directoryListing?: DirectoryListing;
    })[] = [
        {
            id: '1',
            givenName: 'John',
            surname: 'Doe',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'john-doe',
            directoryListing: { status: ListingStatus.listed },
        } as ProviderProfile & { directoryListing?: DirectoryListing },
        {
            id: '13',
            givenName: 'John',
            surname: 'Doer',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'john-doe',
            directoryListing: { status: ListingStatus.unlisted },
        } as ProviderProfile & { directoryListing?: DirectoryListing },
        {
            id: '12',
            givenName: 'Jane',
            surname: 'Doe',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'jane-doe',
            directoryListing: { status: ListingStatus.pending },
        } as ProviderProfile & { directoryListing?: DirectoryListing },
        {
            id: '123',
            givenName: 'John',
            surname: 'Wick',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'john-wick',
        } as ProviderProfile & { directoryListing?: DirectoryListing },
    ];

    const isOverPlanCapacity =
        user?.plan?.seats !== undefined &&
        profiles.length > (user?.plan?.seats ?? 1);

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
            isLoadingUser={isLoading}
        >
            <PageContentContainer fillContentSpace paddingX={4} paddingY={8}>
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
                                    style={{ marginRight: theme.spacing(3) }}
                                />
                            )}
                            <SeatCount
                                italic
                                isOverPlanCapacity={isOverPlanCapacity}
                            >
                                {profiles.length}{' '}
                                {user?.plan?.seats && ` of ${user.plan.seats}`}{' '}
                                profiles active for your practice.
                            </SeatCount>
                        </Box>
                    </Box>
                    <Box className="admin-controls">
                        <Button
                            onClick={() =>
                                router.push(
                                    URL_PATHS.PROVIDERS.PRACTICE.PROFILES_CREATE
                                )
                            }
                        >
                            New Profile
                        </Button>
                    </Box>
                </TitleContainer>
                <ListTitle marginLeft={5} marginBottom={0}>
                    Provider Name
                </ListTitle>
                <List>
                    {profiles.map((profile) => {
                        const name =
                            `${profile.givenName} ${profile.surname}`.trim();
                        const { text: badgeText, color: badgeColor } =
                            getProfileStatusBadge(
                                profile.directoryListing?.status
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
                                            src={profile.profileImageUrl ?? '#'}
                                            size={AVATAR_SIZE.EXTRA_SMALL}
                                            sx={{ mr: 4 }}
                                        />
                                        <Paragraph
                                            noMargin
                                            sx={{
                                                fontWeight: 500,
                                                marginRight: theme.spacing(4),
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
                </List>
            </PageContentContainer>
        </SideNavigationPage>
    );
}

const ListTitle = styled(Paragraph)(({ theme }) => ({
    ...theme.typography.caption,
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
    profile: ProviderProfile & { directoryListing?: DirectoryListing };
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
                        router.push(
                            `${URL_PATHS.DIRECTORY.ROOT}/${profile.slug}`
                        )
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
    marginBottom: theme.spacing(4),
    '& div:first-child': {
        flex: 1,
    },
    '& div.admin-controls': {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
