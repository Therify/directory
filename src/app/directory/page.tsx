'use client';
import { Select } from '@/components/ui/FormElements/Select';
import { H3 } from '@/components/ui/Typography/Headers';
import { Paragraph } from '@/components/ui/Typography/Paragraph';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const STATES = ['New York', 'New Jersey'] as const;

export default function Directory() {
    return (
        <Container>
            <Header>
                <H3>Find a provider that sees & understands you</H3>
                <Paragraph>
                    Our providers are licensed and ready to provide the care you
                    deserve
                </Paragraph>
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
            </Header>
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
