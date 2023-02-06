import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    Button,
    H1,
    Paragraph,
    PageContentContainer,
    CallToActionCard,
    CenteredContainer,
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
import { Role } from '@prisma/client';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired()
);

export default function PracticeProfileCreatePage() {
    const { user, isLoading } = useTherifyUser();
    const router = useRouter();
    const theme = useTheme();

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
                        <Title>Create a Profile</Title>
                        <Paragraph> How would you like to proceed?</Paragraph>
                    </Box>
                </TitleContainer>
                <CenteredContainer flexDirection="row">
                    <CallToActionCard
                        isActive
                        title="Invite"
                        text="Invite a provider to fill out their own profile"
                        sx={{
                            flex: 1,
                            marginRight: theme.spacing(2),
                            height: '100%',
                        }}
                    >
                        <Button>Invite a provider</Button>
                    </CallToActionCard>
                    <CallToActionCard
                        isActive
                        title="Create"
                        text="Fill the profile out yourself"
                        sx={{ flex: 1, height: '100%' }}
                    >
                        <Button>Create a profile</Button>
                    </CallToActionCard>
                </CenteredContainer>
            </PageContentContainer>
        </SideNavigationPage>
    );
}

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
    '& div:first-child': {
        flex: 1,
    },
    '& div.admin-controls': {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
