import { DirectoryCard } from '@/lib/modules/directory/components/DirectoryCard';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader';
import { membersService } from '@/lib/modules/members/service';
import { DirectoryPageProps } from '@/lib/modules/members/service/get-directory-page-props/getDirectoryPageProps';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { asSelectOptions, RBAC } from '@/lib/shared/utils';
import { trpc } from '@/lib/shared/utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ProviderProfile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { InsuranceProvider, Issue } from '@/lib/shared/types';
import { Select } from '@/lib/shared/components/ui/FormElements/Select';
import { InputWrapper } from '@/lib/shared/components/ui/FormElements/Input/InputWrapper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
                    title={
                        user?.givenName
                            ? `We're glad you're here, ${user.givenName}`
                            : `We're glad you're here!`
                    }
                    subtitle="Browse our directory to find a provider who sees and understands you."
                    actionSlot={
                        <>
                            <Select
                                fullWidth
                                id="insurance"
                                label="Insurance"
                                options={asSelectOptions([
                                    ...InsuranceProvider.ENTRIES,
                                    "I don't have insurance",
                                ])}
                                labelSx={{
                                    color: 'white',
                                }}
                                sx={{
                                    width: '100%',
                                    bgcolor: 'white',
                                }}
                                autoComplete="insurance"
                            />
                            <InputWrapper
                                fullWidth
                                label="Your Concerns"
                                variant="white"
                                sx={{
                                    marginLeft: '0 !important',
                                }}
                            >
                                <Autocomplete
                                    multiple
                                    options={Issue.ENTRIES}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Your Concerns"
                                        />
                                    )}
                                />
                            </InputWrapper>
                        </>
                    }
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
                                        `/members/directory/${profile.id}`
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
