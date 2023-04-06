import { PageHeader } from '@/lib/shared/components/ui/PageHeader';
import { Select } from '@/lib/shared/components/ui/FormElements/Select';
import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import {
    CollectionsOutlined,
    SpaOutlined,
    StreamOutlined,
    MapOutlined,
} from '@mui/icons-material';

const CONTENT_FILTER = {
    ALL_CONTENT: 'All content',
    MEDITATIONS: 'Meditations',
    ACTIVITIES: 'Activities',
    JOURNEYS: 'Journeys',
} as const;

const CONTENT_FILTER_ICON_MAP = {
    [CONTENT_FILTER.ALL_CONTENT]: (
        <CollectionsOutlined sx={{ fill: 'white' }} />
    ),
    [CONTENT_FILTER.MEDITATIONS]: <SpaOutlined sx={{ fill: 'white' }} />,
    [CONTENT_FILTER.ACTIVITIES]: <StreamOutlined sx={{ fill: 'white' }} />,
    [CONTENT_FILTER.JOURNEYS]: <MapOutlined sx={{ fill: 'white' }} />,
} as const;

const CONTENT_FILTERS = [
    CONTENT_FILTER.ALL_CONTENT,
    CONTENT_FILTER.MEDITATIONS,
    CONTENT_FILTER.ACTIVITIES,
    CONTENT_FILTER.JOURNEYS,
];

export function ContentSearchControls() {
    const [selectedContentFilter, setSelectedContentFilter] = useState<
        (typeof CONTENT_FILTER)[keyof typeof CONTENT_FILTER]
    >(CONTENT_FILTER.ALL_CONTENT);
    return (
        <PageHeader
            type="info"
            title="Browse our collection of self-guided resources"
            subtitle="Try and explore our curated meditations, journeys and activities"
            actionSlot={
                <>
                    <DesktopFilterControls>
                        {CONTENT_FILTERS.map((filter) => {
                            const Icon = CONTENT_FILTER_ICON_MAP[filter];
                            return (
                                <Chip
                                    icon={Icon}
                                    label={filter}
                                    key={filter}
                                    clickable
                                    variant="outlined"
                                    sx={{
                                        mr: 8,
                                        fill: 'white',
                                        '.MuiChip-label': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            );
                        })}
                    </DesktopFilterControls>
                    <MobileFilterControls>
                        <StyledSelect
                            id="All content"
                            placeholder="Filter by"
                            fullWidth
                            value={selectedContentFilter}
                            onChange={(value) => {
                                setSelectedContentFilter(
                                    value as (typeof CONTENT_FILTER)[keyof typeof CONTENT_FILTER]
                                );
                            }}
                            options={CONTENT_FILTERS.map((filter) => ({
                                value: filter,
                                label: filter,
                                displayText: filter,
                            }))}
                        />
                    </MobileFilterControls>
                </>
            }
        />
    );
}

const DesktopFilterControls = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const MobileFilterControls = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    background: 'white',
}));
