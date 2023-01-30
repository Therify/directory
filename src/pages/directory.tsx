import { Select } from '@/components/ui/FormElements/Select';
import { TopNavigationLayout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { TopBar } from '@/components/ui/TopBar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { GetServerSideProps } from 'next';

const STATES = ['New York', 'New Jersey'] as const;

interface Props {
    results: Record<string, unknown>[];
}

function Directory({ results }: Props) {
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
                <ResultsSection></ResultsSection>
            </Container>
        </TopNavigationLayout>
    );
}

const FilterSection = styled(Box)(({ theme }) => ({}));

const ResultsSection = styled(Box)(({ theme }) => ({}));

const Container = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    padding: theme.spacing(4),
}));

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return {
        props: {
            results: [],
        },
    };
};

export default Directory;
