import { Avatar as AvatarUi } from '@/lib/shared/components/ui';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AvatarProps {
    name: string;
    src?: string;
    isOnline: boolean;
}

export const Avatar = ({ name, src, isOnline }: AvatarProps) => {
    return (
        <Box position="relative">
            <AvatarUi src={src} alt={`${name} avatar`} />
            {isOnline && <OnlineIndicator />}
        </Box>
    );
};

const OnlineIndicator = styled('div')(({ theme }) => ({
    position: 'absolute',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    bottom: 0,
    right: 0,
    border: `2px solid ${theme.palette.background.paper}`,
}));
