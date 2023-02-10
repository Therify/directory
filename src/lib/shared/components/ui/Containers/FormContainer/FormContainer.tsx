import {
    Alert,
    ALERT_TYPE,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import { ReportProblemRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { LoadingContainer } from '../LoadingContainer';

interface FormContainerProps {
    errorMessage?: string;
    clearErrorMessage?: () => void;
    isLoading?: boolean;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const FormContainer = ({
    errorMessage,
    clearErrorMessage,
    isLoading = false,
    children,
    sx,
}: FormContainerProps) => {
    return (
        <Container isError={Boolean(errorMessage)} sx={sx}>
            <LoadingContainer isLoading={isLoading}>
                {children}
            </LoadingContainer>
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Alert
                        icon={<ErrorIcon />}
                        type={ALERT_TYPE.ERROR}
                        title={errorMessage ?? ''}
                        onClose={clearErrorMessage}
                    />
                </motion.div>
            )}
        </Container>
    );
};

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError: boolean }>(({ theme, isError }) => ({
    width: '100%',
    minHeight: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6.5, 8),
    marginTop: theme.spacing(10),
    transition: '.2s ease-in-out',
    ...(isError && { border: `2px solid ${theme.palette.error.main}` }),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(30),
    },
}));

const ErrorIcon = () => (
    <CenteredContainer>
        <ReportProblemRounded />
    </CenteredContainer>
);
