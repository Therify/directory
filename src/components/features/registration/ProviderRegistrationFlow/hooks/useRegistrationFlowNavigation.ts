import { useState } from 'react';

export const useRegistrationFlowNavigation = (steps: string[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const getIsNextDisabled = (options: {
        isEmailUnique: boolean | undefined;
        isUserDetailsValid: boolean;
        isPlanIdValid: boolean;
        isCardDetailsValid: boolean;
        isBillingDetailsValid: boolean;
    }): boolean => {
        if (currentStepIndex === 0) {
            return !options.isUserDetailsValid || !options.isEmailUnique;
        }
        if (currentStepIndex === 1) {
            return !options.isPlanIdValid;
        }
        if (currentStepIndex === 2) {
            return (
                !options.isCardDetailsValid || !options.isBillingDetailsValid
            );
        }
        return true;
    };

    return {
        steps,
        currentStep: steps[currentStepIndex],
        currentStepIndex,
        setCurrentStepIndex: (i: number) => {
            if (i < 0) return setCurrentStepIndex(0);
            if (i > steps.length - 1)
                return setCurrentStepIndex(steps.length - 1);
            setCurrentStepIndex(i);
        },
        isLoading: false,
        getIsNextDisabled,
        isFinalStep: currentStepIndex === steps.length - 1,
        back: () =>
            setCurrentStepIndex(
                currentStepIndex - 1 >= 0 ? currentStepIndex - 1 : 0
            ),
    };
};
