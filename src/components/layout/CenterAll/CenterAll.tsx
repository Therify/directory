import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export interface CenterAllProps {
    children: React.ReactNode;
}

export const TEST_IDS = {
    ROOT: 'center-all',
};

export const CenterAll: React.FC<CenterAllProps> = ({ children }) => {
    return <StyledBox data-testid={TEST_IDS.ROOT}>{children}</StyledBox>;
};

export const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;
