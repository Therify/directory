import { Autocomplete, TextField, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader';
import { Button } from '@/lib/shared/components/ui/Button';
import { Filter, FilterList } from '@mui/icons-material';
import { SelectOption, Select } from '@/lib/shared/components/ui';

export interface FilterOption {
    name: string;
    options: SelectOption[];
}
interface ProviderSearchControlsProps {
    primaryFilters: FilterOption[];
    secondaryFilters: FilterOption[];
    mobileFilters: FilterOption[];
    onChange: (
        filter: FilterOption['name'],
        value: SelectOption['value']
    ) => void;
}

export function ProviderSearchControls({
    primaryFilters,
    secondaryFilters,
    onChange,
}: ProviderSearchControlsProps) {
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
                    {primaryFilters.map((filter) => (
                        <Box
                            key={filter.name}
                            sx={{
                                gridColumn: 'span 2',
                                display: 'flex',
                            }}
                        >
                            <Select
                                id={filter.name}
                                label={filter.name}
                                options={filter.options}
                            />
                        </Box>
                    ))}
                    {/* <Box
                        sx={{
                            gridColumn: 'span 2',
                            display: 'flex',
                        }}
                    >
                        State
                    </Box>
                    <Box sx={{ background: 'white' }}>Modality</Box>
                    <Box sx={{ background: 'white' }}>Availability</Box>
                    <Box
                        sx={{
                            background: 'white',
                            gridColumn: {
                                xs: 'span 2',
                                md: 'span 1',
                            },
                        }}
                    >
                        Pricing
                    </Box>
                    <Box
                        sx={{
                            background: 'white',
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                        }}
                    >
                        Gender
                    </Box>
                    <Box
                        sx={{
                            background: 'white',
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                        }}
                    >
                        Ethnicity
                    </Box>
                    <Box
                        sx={{
                            background: 'white',
                            gridColumn: {
                                xs: 'span 2',
                                md: 'span 1',
                            },
                        }}
                    >
                        More filters
                    </Box> */}
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

// const StyledSelect = styled(Select)(({ theme }) => ({
//     background: 'white',
// }));

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
