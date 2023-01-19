import {
    ArrowForwardRounded as NextIcon,
    ArrowBackRounded as BackIcon,
} from '@mui/icons-material';
import { styled, Box } from '@mui/material';
import { Button, BUTTON_TYPE } from '@/components/ui';

interface ButtonControlsProps {
    hideBackButton: boolean;
    onBack: () => void;
    onNext: () => void;
    isNextLoading: boolean;
    isNextDisabled?: boolean;
    isFinalStep: boolean;
}

export const ButtonControls = ({
    hideBackButton,
    isNextDisabled,
    isNextLoading,
    isFinalStep,
    onBack,
    onNext,
}: ButtonControlsProps) => {
    return (
        <ButtonContainer>
            {!hideBackButton && (
                <Button
                    disabled={isNextLoading}
                    fullWidth
                    startIcon={<BackIcon />}
                    type={BUTTON_TYPE.OUTLINED}
                    onClick={onBack}
                >
                    Back
                </Button>
            )}
            <Button
                isLoading={isNextLoading}
                disabled={isNextDisabled}
                fullWidth={hideBackButton}
                endIcon={<NextIcon />}
                onClick={onNext}
            >
                {isFinalStep ? 'Sign Up' : 'Next'}
            </Button>
        </ButtonContainer>
    );
};

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(10),
    '& button:last-child': {
        marginLeft: theme.spacing(4),
    },
}));
