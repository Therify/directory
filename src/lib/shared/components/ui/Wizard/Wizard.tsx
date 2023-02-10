import React, { FunctionComponent } from 'react';

import { WizardChildProps, WizardComponents, WizardProps } from './types';
import { WizardContents } from './WizardContents';
import { WizardControls } from './WizardControls';
import { WizardProgress } from './WizardProgress';
import { WizardStep } from './WizardStep';

export const Wizard: FunctionComponent<WizardProps> & WizardComponents = ({
    children,
    ...props
}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [stepsCount, setStepsCount] = React.useState(0);
    const next = React.useCallback(() => {
        if (activeIndex < stepsCount - 1) setActiveIndex(activeIndex + 1);
    }, [stepsCount, activeIndex]);
    const previous = React.useCallback(() => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    }, [activeIndex]);
    return (
        <div {...props}>
            {React.Children.map(children, (element) => {
                if (!React.isValidElement(element)) return null;
                const child = element as React.ReactElement<WizardChildProps>;
                return React.cloneElement(child, {
                    stepsCount,
                    activeIndex,
                    setStepsCount,
                    setActiveIndex,
                    previous,
                    next,
                    hasNext: activeIndex < stepsCount - 1,
                    hasPrevious: activeIndex > 0,
                });
            })}
        </div>
    );
};

Wizard.Progress = WizardProgress;
Wizard.Step = WizardStep;
Wizard.Contents = WizardContents;
Wizard.Controls = WizardControls;
