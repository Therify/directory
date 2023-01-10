import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const therifyLogo =
    'https://images.squarespace-cdn.com/content/v1/602b3b78aeefe23588afe66b/1659721869760-NCD7RXK5GCDMC3DZMELG/therify-logo.png?format=2500w';

interface TopBarProps {
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
}

export const TopBar = ({ leftSlot, rightSlot }: TopBarProps) => {
    return (
        <TopBarContainer component="header">
            <SlotContainer>
                {leftSlot}
                <TherifyLogo
                    src={therifyLogo}
                    alt="The Official logo of Therify Inc."
                />
            </SlotContainer>
            <SlotContainer>{rightSlot}</SlotContainer>
        </TopBarContainer>
    );
};
const SlotContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
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

const TherifyLogo = styled('img')(() => ({
    height: '52px',
}));
