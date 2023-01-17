import { Autocomplete, Select, TextField, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Filter, FilterList } from '@mui/icons-material';

export function ProviderSearchControls() {
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    return (
        <PageHeader
            title="Find a provider that sees & understands you"
            subtitle="Our providers are licensed and ready to provide the care you deserve"
            type="secondary"
            actionSlot={
                <Box
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'row',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(8, 1fr)',
                        },
                        gridGap: 8,
                        maxWidth: 1200,
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: 'span 2',
                            display: 'flex',
                        }}
                    >
                        <StyledAutoComplete
                            options={[]}
                            renderInput={() => (
                                <TextField label="Your city of Zip" />
                            )}
                        />
                        <StyledSelect label="State" sx={{ minWidth: 102 }} />
                    </Box>
                    <Box sx={{ bgColor: 'white' }}>
                        <StyledSelect label="In-Person" fullWidth />
                    </Box>
                    <Box sx={{ bgColor: 'white' }}>
                        <StyledSelect label="Availability" />
                    </Box>
                    <Box
                        sx={{
                            bgColor: 'white',
                            gridColumn: {
                                xs: 'span 2',
                                md: 'span 1',
                            },
                        }}
                    >
                        <StyledSelect
                            label="Pricing"
                            fullWidth={isSmallScreen}
                        />
                    </Box>
                    <Box
                        sx={{
                            bgColor: 'white',
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                        }}
                    >
                        <StyledSelect
                            label="Gender"
                            fullWidth={isSmallScreen}
                        />
                    </Box>
                    <Box
                        sx={{
                            bgColor: 'white',
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                        }}
                    >
                        <StyledSelect
                            label="Ethnicity"
                            fullWidth={isSmallScreen}
                        />
                    </Box>
                    <Box
                        sx={{
                            bgColor: 'white',
                            gridColumn: {
                                xs: 'span 2',
                                md: 'span 1',
                            },
                        }}
                    >
                        <MoreFiltersButton
                            fullWidth={isSmallScreen}
                            endIcon={<FilterList />}
                        >
                            More filters
                        </MoreFiltersButton>
                    </Box>
                </Box>
            }
        />
    );
}

const SearchControlsContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

interface InputContainerProps extends BoxProps {
    span: 1 | 2;
    isSubgrid?: boolean;
}

const InputContainer = styled(Box)<InputContainerProps>(
    ({ theme, span, isSubgrid }) => ({
        gridColumn: `span ${span}`,
        display: 'grid',
        ...(isSubgrid && {
            gridTemplateColumns: '1fr 1fr',
            gridGap: theme.spacing(2),
        }),
    })
);

const StyledSelect = styled(Select)(({ theme }) => ({
    background: 'white',
}));

const MoreFiltersButton = styled(Button)(({ theme }) => ({
    background: 'white',
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
        background: 'white',
    },
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        padding: 0,
        background: 'white',
    },
}));
