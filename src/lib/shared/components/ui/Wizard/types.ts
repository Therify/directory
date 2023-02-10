import React, { FunctionComponent } from 'react';

export type WizardProps = {
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

export interface WizardChildProps {
    /**
     * The total number of steps in the wizard
     */
    stepsCount?: number;
    /**
     * The current step index
     */
    activeIndex?: number;
    /**
     * Called by Wizard.Contents to count steps
     */
    setStepsCount?: (count: number) => void;
    /**
     * Set the active step index
     */
    setActiveIndex?: (index: number) => void;
    /**
     * Set active step index to previous step
     */
    previous?: () => void;
    /**
     * Set active step index to next step
     */
    next?: () => void;
    /**
     * Indicates if Wizard has a next step
     */
    hasNext?: boolean;
    /**
     * Indicates if Wizard has a previous step
     */
    hasPrevious?: boolean;
    children?: React.ReactNode;
}

/**
 * Composite component types for Wizard
 */
export interface WizardComponents {
    Progress: FunctionComponent<WizardChildProps>;
    Contents: FunctionComponent<WizardChildProps>;
    Step: FunctionComponent<WizardChildProps & { doRender?: boolean }>;
    Controls: FunctionComponent<
        WizardChildProps & {
            renderNext?: WizardControlsProps;
            renderPrevious?: WizardControlsProps;
        }
    >;
}
export type WizardControlsProps = (
    props: Pick<
        WizardChildProps,
        'hasNext' | 'hasPrevious' | 'previous' | 'next'
    >
) => JSX.Element;
