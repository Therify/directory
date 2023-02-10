import { DirectoryCard } from '@/components/features/directory/DirectoryCard';
import { MemberNavigationPage } from '@/components/features/pages/MemberNavigationPage';
import { PageHeader } from '@/components/ui/PageHeader';
import { membersService } from '@/lib/services/members';
import { DirectoryPageProps } from '@/lib/services/members/get-directory-page-props/getDirectoryPageProps';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { RBAC } from '@/lib/utils';
import { trpc } from '@/lib/utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ProviderProfile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

const STATES = ['New York', 'New Jersey'] as const;

type JSONSafeProviderProfile = Omit<
    ProviderProfile,
    'createdAt' | 'updatedAt'
> & {
    createdAt: string;
    updatedAt: string;
};
interface Props {
    results: JSONSafeProviderProfile[];
}

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getDirectoryPageProps,
    })
);

function Directory({
    providerProfiles = [],
    user,
    favoriteProfiles = [],
}: DirectoryPageProps) {
    const router = useRouter();
    const mutation = trpc.useMutation('members.favorite-profile');
    const [favoriteProfilesMap, setFavoriteProfilesMap] = React.useState<{
        [key: string]: boolean;
    }>(
        favoriteProfiles.reduce(
            (acc, profile) => ({
                ...acc,
                [profile.id]: true,
            }),
            {}
        )
    );
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.DIRECTORY}
            user={user}
        >
            <Container>
                <PageHeader
                    type="secondary"
                    title="Find a provider that sees & understands you"
                    subtitle="Our providers are licensed and ready to provide the care you deserve"
                />
                <ResultsSection>
                    {providerProfiles.map((profile) => {
                        const isCurrentlyFavorite =
                            favoriteProfilesMap[profile.id] ?? false;
                        return (
                            <DirectoryCard
                                {...profile}
                                key={profile.id}
                                onClick={() => {
                                    router.push(
                                        `members/directory/${profile.id}`
                                    );
                                }}
                                isFavorite={isCurrentlyFavorite}
                                handleFavoriteClicked={(setIsFavorite) =>
                                    () => {
                                        mutation.mutate(
                                            {
                                                profileId: profile.id,
                                                memberId: user.userId,
                                                isFavorite: isCurrentlyFavorite,
                                            },
                                            {
                                                onSuccess: ({ isFavorite }) =>
                                                    setIsFavorite(isFavorite),
                                                onSettled: () => {
                                                    setFavoriteProfilesMap({
                                                        ...favoriteProfilesMap,
                                                        [profile.id]:
                                                            !isCurrentlyFavorite,
                                                    });
                                                },
                                            }
                                        );
                                    }}
                            />
                        );
                    })}
                </ResultsSection>
            </Container>
        </MemberNavigationPage>
    );
}

const FilterSection = styled(Box)(({ theme }) => ({}));

const ResultsSection = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(4),
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    padding: theme.spacing(4),
}));

const Container = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(4),
    overflowY: 'auto',
}));

export default Directory;
