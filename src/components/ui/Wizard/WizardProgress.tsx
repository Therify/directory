import { Step, StepLabel, Stepper, styled } from '@mui/material';

import { WizardChildProps } from './types';

export function WizardProgress({
    activeIndex,
    stepsCount = 0,
    setActiveIndex = (index: number) => {
        return;
    },
}: WizardChildProps) {
    return (
        <Stepper activeStep={activeIndex} sx={{ m: 4 }}>
            {Array.from({ length: stepsCount }).map((_, i) => (
                <StyledStep
                    key={`wizard-step-${i}`}
                    onClick={() => setActiveIndex(i)}
                >
                    <StepLabel>Step {i + 1}</StepLabel>
                </StyledStep>
            ))}
        </Stepper>
    );
}

const StyledStep = styled(Step)``;
