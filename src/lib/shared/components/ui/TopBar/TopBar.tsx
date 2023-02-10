import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TherifyLogo } from '../Logo';

interface TopBarProps {
    logoHeight?: string;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
}

export const TopBar = ({ leftSlot, rightSlot, logoHeight }: TopBarProps) => {
    return (
        <TopBarContainer component="header">
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

const TopBarContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));
