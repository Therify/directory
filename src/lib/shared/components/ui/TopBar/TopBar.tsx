import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TherifyLogo } from '../Logo';

interface TopBarProps {
    logoHeight?: string;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    v3?: boolean;
}

export const TopBar = ({
    leftSlot,
    rightSlot,
    logoHeight,
    v3,
}: TopBarProps) => {
    return (
        <TopBarContainer component="header" v3={v3}>
            <SlotContainer>
                <TherifyLogo style={{ height: logoHeight ?? '52px' }} />
                {leftSlot}
            </SlotContainer>
            <SlotContainer>{rightSlot}</SlotContainer>
        </TopBarContainer>
    );
};
const SlotContainer = styled(Box)(() => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    '&:last-of-type': {
        justifyContent: 'flex-end',
    },
}));

const TopBarContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'v3',
})<{ v3?: boolean }>(({ theme, v3 }) => ({
    width: '100%',
    height: '100px',
    padding: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...(v3
        ? {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }
        : {
              borderBottom: `1px solid ${theme.palette.divider}`,
          }),
}));
