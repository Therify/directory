import { CircularProgress, SxProps, Theme } from '@mui/material';
import { CenteredContainer } from '../CenteredContainer';

interface LoadingContainerProps {
    isLoading?: boolean;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    loaderColor?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
}

export const LoadingContainer = ({
    isLoading,
    sx,
    children,
    loaderColor,
}: LoadingContainerProps) => {
    return (
        <CenteredContainer fillSpace sx={sx}>
            {isLoading ? <CircularProgress color={loaderColor} /> : children}
        </CenteredContainer>
    );
};
