import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    Caption,
    DataTable,
    DATA_TABLE_TYPE,
    FloatingList,
    H1,
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
import { ProviderProfile, Role } from '@prisma/client';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { EditRounded, DeleteRounded, AddRounded } from '@mui/icons-material';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);

export default function PracticeProfilesPage() {
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    const profiles: ProviderProfile[] = [
        {
            id: '1',
            givenName: 'John',
            surname: 'Doe',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: null,
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'john-doe',
        },
        {
            id: '12',
            givenName: 'Jane',
            surname: 'Doe',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: null,
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'jane-doe',
        },
        {
            id: '123',
            givenName: 'John',
            surname: 'Wick',
            contactEmail: 'test@gmail.com',
            createdAt: new Date(),
            updatedAt: null,
            userId: null,
            bio: null,
            profileImageUrl: null,
            yearsOfExperience: '10+',
            minimumRate: 100,
            maximumRate: 200,
            idealClientDescription: null,
            practiceNotes: null,
            slug: 'john-wick',
        },
    ];

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
                        <Caption italic>
                            {profiles.length} of {user?.plan?.seats} profiles
                            active for your practice.
                        </Caption>
                    </Box>
                    <Box>
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

                <DataTable
                    onRowClick={(item) =>
                        router.push(
                            `${URL_PATHS.PROVIDERS.PRACTICE.PROFILE_EDITOR}/${item.id}`
                        )
                    }
                    type={DATA_TABLE_TYPE.LIST}
                    headers={[
                        {
                            rowKey: 'name',
                            displayValue: 'Provider Name',
                        },
                        {
                            rowKey: 'actions',
                        },
                    ]}
                    rows={profiles.map((profile) => ({
                        name: `${profile.givenName} ${profile.surname}`.trim(),
                        id: profile.id,
                        slug: profile.id,
                        actions: <ProfileActions profile={profile} />,
                    }))}
                />
            </PageContentContainer>
        </SideNavigationPage>
    );
}

const ProfileActions = ({ profile }: { profile: ProviderProfile }) => {
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
    ];
    return (
        <Box display="flex" justifyContent="flex-end">
            <Box display="flex" onClick={(event) => event.stopPropagation()}>
                <Button
                    type={BUTTON_TYPE.OUTLINED}
                    size={BUTTON_SIZE.SMALL}
                    color="info"
                    onClick={() =>
                        router.push(`${URL_PATHS.DIRECTORY}/${profile.slug}`)
                    }
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
    '& div:last-child': {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
