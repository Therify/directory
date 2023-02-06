import { Box } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { H2, Overline } from '../Typography';

interface PriceCardProps {
    title: string;
    text: string;
    isActive?: boolean;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
}
export const CallToActionCard = ({
    title,
    text,
    isActive = false,
    sx,
    children,
}: PriceCardProps) => {
    return (
        <Card isActive={isActive} sx={sx}>
            <Overline>{title}</Overline>
            <H2>{text}</H2>
            {children}
        </Card>
    );
};

const Card = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8),
    borderRadius: 10,
    background: theme.palette.background.paper,
    border: `4px solid ${
        isActive ? theme.palette.primary.main : theme.palette.background.paper
    }`,
}));
