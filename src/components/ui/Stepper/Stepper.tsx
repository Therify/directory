import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../themes/therify-design-system';

interface StepperProps {
    steps: string[];
    activeStepIndex: number;
}

export const Stepper = ({ steps, activeStepIndex }: StepperProps) => {
    return (
        <StepperContainer activeStep={activeStepIndex} alternativeLabel>
            {steps.map((label, index) => (
                <Step
                    className={
                        activeStepIndex === index ? 'current-step' : undefined
                    }
                    key={label}
                >
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </StepperContainer>
    );
};

const StepperContainer = styled(MuiStepper)(({ theme }) => ({
    '& .MuiStepLabel-label': {
        color: theme.palette.primary.light,
        '&.Mui-completed': { fontWeight: 400 },
    },
    '& .current-step .MuiStepLabel-label': {
        color: theme.palette.text.primary,
    },
    '& .MuiStepConnector-line': {
        border: `1px dashed ${colors.primary[50]}`,
    },

    '& .MuiStepLabel-iconContainer': {
        '& svg': { fill: theme.palette.primary.main },
    },
}));
