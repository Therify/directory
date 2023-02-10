import { DirectoryCard } from '@/components/features/directory/DirectoryCard';
import { MemberNavigationPage } from '@/components/features/pages/MemberNavigationPage';
import { PageHeader } from '@/components/ui/PageHeader';
import { membersService } from '@/lib/services/members';
import { FavoritesPageProps } from '@/lib/services/members/get-favorites-page-props/getFavoritesPageProps';
import { RBAC } from '@/lib/utils';
import { trpc } from '@/lib/utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getFavoritesPageProps,
    })
);

export default function MemberFavoritesPage({
    favoriteProfiles = [],
    user,
}: FavoritesPageProps) {
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
        <MemberNavigationPage user={user} currentPath="/members/favorites">
            <PageContainer>
                <PageHeader
                    title="Your Favorited Provider Profiles"
                    subtitle="You can view your favorited provider profiles here."
                />
                <FavoriteProfilesContainer>
                    {favoriteProfiles.map((profile) => {
                        const isCurrentlyFavorite =
                            favoriteProfilesMap[profile.id];
                        return (
                            <DirectoryCard
                                {...profile}
                                key={profile.id}
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
                                onClick={() =>
                                    router.push(
                                        `/members/directory/${profile.id}`
                                    )
                                }
                            />
                        );
                    })}
                </FavoriteProfilesContainer>
            </PageContainer>
        </MemberNavigationPage>
    );
}

const PageContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(4),
    overflowY: 'auto',
}));

const FavoriteProfilesContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(4),
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    padding: theme.spacing(4),
}));
