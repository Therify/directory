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
import { generateMock } from '@anatine/zod-mock';
import { DirectoryListingSchema, ProviderProfileSchema } from '@/lib/schema';
import { z } from 'zod';

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

type ProviderPracticeProfileListItems = Array<
    z.infer<typeof ProviderProfileSchema> & {
        directoryListing?: z.infer<typeof DirectoryListingSchema>;
    }
>;

const TEST_PROFILES: ProviderPracticeProfileListItems = Array.from({
    length: 3,
}).map(() => {
    const providerProfile = generateMock(
        ProviderProfileSchema.extend({
            slug: z.string(),
        })
    );
    const directoryListing = generateMock(DirectoryListingSchema);
    return {
        ...providerProfile,
        directoryListing,
    };
});

export default function PracticeProfilesPage() {
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    const theme = useTheme();
    const profiles = TEST_PROFILES;

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
    profile: z.infer<typeof ProviderProfileSchema> & {
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
