import { CircularProgress, SxProps, Theme } from '@mui/material';
import { CenteredContainer } from '../CenteredContainer';

interface LoadingContainerProps {
    isLoading?: boolean;
    sx?: SxProps<Theme>;
    loadingTopSlot?: React.ReactNode;
    loadingBottomSlot?: React.ReactNode;
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
    loadingTopSlot,
    loadingBottomSlot,
}: LoadingContainerProps) => {
    return (
        <CenteredContainer fillSpace sx={sx}>
            {isLoading ? (
                <>
                    {loadingTopSlot}
                    <CircularProgress color={loaderColor} />
                    {loadingBottomSlot}
                </>
            ) : (
                children
            )}
        </CenteredContainer>
    );
};
