import {
    DirectoryCard,
    MockDirectoryCardProps,
} from '@/components/features/directory/DirectoryCard';
import { Select } from '@/components/ui/FormElements/Select';
import { TopNavigationLayout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { TopBar } from '@/components/ui/TopBar';
import { prisma } from '@/lib/prisma';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { ProviderProfile } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';

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

function Directory({ results = [] }: Props) {
    const router = useRouter();
    return (
        <TopNavigationLayout navigationSlot={<TopBar />}>
            <Container>
                <PageHeader
                    type="secondary"
                    title="Find a provider that sees & understands you"
                    subtitle="Our providers are licensed and ready to provide the care you deserve"
                    actionSlot={
                        <FilterSection>
                            <FormControl fullWidth>
                                <Select
                                    fullWidth
                                    sx={{ backgroundColor: 'white' }}
                                    options={STATES.map((state) => ({
                                        label: state,
                                        displayText: state,
                                        value: state,
                                    }))}
                                    value="New York"
                                    id="state"
                                />
                            </FormControl>
                        </FilterSection>
                    }
                />
                <ResultsSection>
                    {results.map((profile) => (
                        <DirectoryCard
                            key={profile.id}
                            onClick={() => {
                                router.push(`directory/${profile.id}`);
                            }}
                            providerName={`${profile.givenName} ${profile.surname}`}
                            providerCredentials={''}
                            providerImageURL={profile.profileImageUrl}
                            providerRate={profile.minimumRate}
                            isFavorite={false}
                        />
                    ))}
                </ResultsSection>
            </Container>
        </TopNavigationLayout>
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const providerProfile = await prisma.providerProfile.findMany();
    const results = providerProfile.map((profile) => ({
        ...profile,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString(),
    }));
    return {
        props: {
            results,
        },
    };
};

export default Directory;
