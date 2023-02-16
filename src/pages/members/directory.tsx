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
import { Button } from '@/lib/shared/components/ui/Button';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useIntersectionObserver } from 'usehooks-ts';
import { AnimatePresence, motion } from 'framer-motion';
import Stack from '@mui/material/Stack';

type JSONSafeProviderProfile = Omit<
    ProviderProfile,
    'createdAt' | 'updatedAt'
> & {
    createdAt: string;
    updatedAt: string;
};

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
    const [localProfiles, setLocalProfiles] =
        React.useState<DirectoryPageProps['providerProfiles']>(
            providerProfiles
        );
    const [selectedInsurance, setSelectedInsurance] =
        React.useState<string>('');
    const [selectedIssues, setSelectedIssues] = React.useState<string[]>([]);
    React.useEffect(() => {
        const filteredProfiles = providerProfiles.filter(
            (profile: DirectoryPageProps['providerProfiles'][number]) => {
                const insuranceMatch = selectedInsurance
                    ? profile.acceptedInsurances.includes(
                          selectedInsurance as InsuranceProvider.InsuranceProvider
                      )
                    : true;
                const issueMatch = selectedIssues.length
                    ? selectedIssues.some((issue) =>
                          profile.specialties.includes(issue as Issue.Issue)
                      )
                    : true;
                return insuranceMatch && issueMatch;
            }
        );
        setLocalProfiles(filteredProfiles);
    }, [selectedInsurance, selectedIssues, providerProfiles]);
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
    const pageHeaderRef = React.useRef<HTMLDivElement>(null);
    const entry = useIntersectionObserver(pageHeaderRef, {});
    const isHeaderVisible = !!entry?.isIntersecting;
    const scrollToTop = React.useCallback(() => {
        pageHeaderRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);
    const clearFilters = React.useCallback(() => {
        setSelectedInsurance('');
        setSelectedIssues([]);
    }, []);
    const hasFilters = selectedInsurance || selectedIssues.length > 0;
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.DIRECTORY}
            user={user}
        >
            <Container>
                <PageHeader
                    type="secondary"
                    ref={pageHeaderRef}
                    title={
                        user?.givenName
                            ? `We're glad you're here, ${user.givenName}`
                            : `We're glad you're here!`
                    }
                    subtitle="Browse our directory to find a provider who sees and understands you."
                    actionSlot={
                        <Stack
                            sx={{
                                direction: {
                                    xs: 'column',
                                    md: 'row',
                                },
                                spacing: 2,
                            }}
                        >
                            <Select
                                required
                                fullWidth
                                id="insurance"
                                label="Filter By Insurance"
                                options={asSelectOptions(
                                    InsuranceProvider.ENTRIES
                                )}
                                value={selectedInsurance}
                                onChange={(e) => {
                                    setSelectedInsurance(e);
                                }}
                                sx={{
                                    width: '100%',
                                    bgcolor: 'white',
                                }}
                                autoComplete="insurance"
                            />
                            <InputWrapper
                                fullWidth
                                required
                                label="Filter by your Concerns"
                                variant="white"
                                sx={{
                                    marginLeft: '0 !important',
                                }}
                            >
                                <Autocomplete
                                    multiple
                                    options={Issue.ENTRIES}
                                    value={selectedIssues}
                                    onChange={(e, value) => {
                                        setSelectedIssues(value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Your Concerns"
                                        />
                                    )}
                                />
                            </InputWrapper>
                            {hasFilters && (
                                <Button onClick={clearFilters} fullWidth>
                                    Clear Filters
                                </Button>
                            )}
                        </Stack>
                    }
                />
                <ResultsSection>
                    {localProfiles.map((profile) => {
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
                <AnimatePresence>
                    {!isHeaderVisible && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <ScrollToTopButton onClick={scrollToTop}>
                                <ArrowUpward />
                            </ScrollToTopButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </MemberNavigationPage>
    );
}

const ScrollToTopButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

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
    position: 'relative',
}));

export default Directory;
