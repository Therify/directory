import { Grid } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface TwoColumnGridProps {
    leftSlot?: ReactNode;
    leftSlotSx?: SxProps<Theme>;
    leftColumnSize?: number;
    rightSlot?: ReactNode;
    rightSlotSx?: SxProps<Theme>;
    wrapperSx?: SxProps<Theme>;
    fillSpace?: boolean;
}

export const TEST_IDS = {
    LEFT_SLOT: 'left-slot',
    RIGHT_SLOT: 'right-slot',
};

export const TwoColumnGrid = ({
    leftSlot,
    rightSlot,
    leftColumnSize = 6,
    leftSlotSx,
    rightSlotSx,
    wrapperSx,
    fillSpace,
}: TwoColumnGridProps) => {
    const rightColumnSize = 12 - leftColumnSize;
    return (
        <Grid
            container
            sx={{
                flexGrow: 1,
                ...(fillSpace ? { height: '100%', width: '100%' } : {}),
                ...wrapperSx,
            }}
        >
            <GridItem
                item
                xs={12}
                md={leftColumnSize}
                data-testid={TEST_IDS.LEFT_SLOT}
                sx={leftSlotSx}
            >
                {leftSlot}
            </GridItem>
            <GridItem
                item
                xs={12}
                md={rightColumnSize}
                data-testid={TEST_IDS.RIGHT_SLOT}
                sx={rightSlotSx}
            >
                {rightSlot}
            </GridItem>
        </Grid>
    );
};

const GridItem = styled(Grid)(({ theme }) => ({
    overflow: 'auto',
}));
