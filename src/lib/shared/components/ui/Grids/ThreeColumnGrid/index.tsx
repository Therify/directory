import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSSProperties, PropsWithChildren, ReactNode } from 'react';

interface ThreeColumnGridProps {
    leftSlot?: ReactNode;
    leftSlotStyle?: CSSProperties;
    rightSlot?: ReactNode;
    rightSlotStyle?: CSSProperties;
    centerSlotStyle?: CSSProperties;
    centerColumnSize?: number;
    style?: CSSProperties;
}

export const TEST_IDS = {
    LEFT_SLOT: 'left-slot',
    RIGHT_SLOT: 'right-slot',
    CENTER_SLOT: 'center-slot',
};

export const ThreeColumnGrid = ({
    leftSlot,
    rightSlot,
    children,
    leftSlotStyle,
    rightSlotStyle,
    centerSlotStyle,
    centerColumnSize = 6,
    style,
}: PropsWithChildren<ThreeColumnGridProps>) => {
    const outerSize = (12 - centerColumnSize) / 2;
    return (
        <Grid
            container
            sx={{ flexGrow: 1, height: '100%', width: '100%', ...style }}
            spacing={3}
        >
            <GridItem
                item
                xs={12}
                md={outerSize}
                data-testid={TEST_IDS.LEFT_SLOT}
                style={leftSlotStyle}
            >
                {leftSlot}
            </GridItem>
            <GridItem
                item
                xs={12}
                md={centerColumnSize}
                data-testid={TEST_IDS.CENTER_SLOT}
                style={centerSlotStyle}
            >
                {children}
            </GridItem>
            <GridItem
                item
                xs={12}
                md={outerSize}
                data-testid={TEST_IDS.RIGHT_SLOT}
                style={rightSlotStyle}
            >
                {rightSlot}
            </GridItem>
        </Grid>
    );
};

const GridItem = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    overflow: 'auto',
}));
