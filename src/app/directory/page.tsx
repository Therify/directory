'use client';
import { Select } from '@/components/ui/FormElements/Select';
import { PageHeader } from '@/components/ui/PageHeader';
import { H3 } from '@/components/ui/Typography/Headers';
import { Paragraph } from '@/components/ui/Typography/Paragraph';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const STATES = ['New York', 'New Jersey'] as const;

export default function Directory() {
    return (
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
        </Container>
    );
}
const FilterSection = styled(Box)(({ theme }) => ({}));
const Header = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
}));

const Container = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    padding: theme.spacing(4),
}));
