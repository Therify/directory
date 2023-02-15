import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    Button,
    BUTTON_SIZE,
    BUTTON_TYPE,
    Avatar,
    AVATAR_SIZE,
    H1,
    List,
    ListItem,
    Paragraph,
    PageContentContainer,
    LoadingContainer,
    Alert,
    IconButton,
} from '@/lib/shared/components/ui';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import {
    URL_PATHS,
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
} from '@/lib/sitemap';
import { EditRounded } from '@mui/icons-material';
import { RBAC } from '@/lib/shared/utils';
import { styled, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import { trpc } from '@/lib/shared/utils/trpc';
import { ProviderProfile } from '@/lib/shared/types';
import { GetProviderProfileByUserId } from '@/lib/modules/providers/features/profiles';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function PracticeProfilesPage({
    user,
}: ProviderTherifyUserPageProps) {
    const router = useRouter();
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));

    const {
        data,
        isLoading,
        error: trpcError,
    } = trpc.useQuery(
        [
            `providers.${GetProviderProfileByUserId.TRPC_ROUTE}`,
            {
                userId: user?.userId,
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: !!user?.userId,
        }
    );

    const { profile, errors } = data ?? {
        errors: [] as string[],
    };
    const profiles: ProviderProfile.ProviderProfile[] = profile
        ? [profile]
        : [];
    const [queryError] = errors;
    const errorMessage = trpcError?.message || queryError;

    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.PROFILES}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...COACH_MAIN_MENU]}
            secondaryMenu={[...COACH_SECONDARY_MENU]}
            mobileMenu={[...COACH_MOBILE_MENU]}
        >
            <LoadingContainer isLoading={isLoading}>
                <PageContentContainer
                    fillContentSpace
                    paddingX={0}
                    paddingY={8}
                >
                    <TitleContainer>
                        <Box>
                            <Title>Your Profile</Title>
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
                            <Paragraph>No profiles to show. </Paragraph>
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
                                            `${URL_PATHS.PROVIDERS.COACH.PROFILE_EDITOR}/${profile.id}`
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
                                        </Box>
                                        <ProfileActions
                                            isMobileWidth={isMobileWidth}
                                            profile={profile}
                                            onEdit={() =>
                                                router.push(
                                                    `${URL_PATHS.PROVIDERS.COACH.PROFILE_EDITOR}/${profile.id}`
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

const ProfileList = styled(List)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
}));

const ViewListingLink = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    margin: 0,
    padding: 0,
}));

const ListingButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const ProfileActions = ({
    profile,
    isMobileWidth,
    onEdit,
}: {
    isMobileWidth: boolean;
    profile: ProviderProfile.ProviderProfile;
    onEdit: () => void;
}) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const diretoryUrl = `${baseUrl}${URL_PATHS.DIRECTORY.ROOT}/${profile.id}`;
    return (
        <Box display="flex" justifyContent="flex-end">
            <Box
                display="flex"
                alignItems="center"
                onClick={(event) => event.stopPropagation()}
            >
                <ViewListingLink href={diretoryUrl} target="_blank">
                    <ListingButton
                        type={BUTTON_TYPE.OUTLINED}
                        size={BUTTON_SIZE.SMALL}
                        color="info"
                    >
                        {isMobileWidth ? 'View' : 'View in directory'}
                    </ListingButton>
                </ViewListingLink>

                {isMobileWidth ? (
                    <IconButton
                        type={BUTTON_TYPE.OUTLINED}
                        size={BUTTON_SIZE.SMALL}
                        color="info"
                        onClick={onEdit}
                    >
                        <EditRounded />
                    </IconButton>
                ) : (
                    <ListingButton
                        type={BUTTON_TYPE.OUTLINED}
                        size={BUTTON_SIZE.SMALL}
                        color="info"
                        onClick={onEdit}
                    >
                        Edit
                    </ListingButton>
                )}
            </Box>
        </Box>
    );
};
