import React from 'react';

import Box from '@mui/material/Box';

import { WizardChildProps } from './types';

const _setStepsCount = (count: number) => {
    return;
};

export function WizardContents({
    setStepsCount = _setStepsCount,
    children,
    activeIndex,
}: WizardChildProps) {
    const safeChildrenLength = React.useMemo(
        () => React.Children.count(children),
        [children]
    );
    React.useEffect(() => {
        setStepsCount(safeChildrenLength);
    }, [setStepsCount, safeChildrenLength]);
    return (
        <Box>
            {React.Children.map(children, (element, index) => {
                if (!React.isValidElement(element)) return null;
                const child = element as React.ReactElement<
                    WizardChildProps & { doRender: boolean }
                >;
                return React.cloneElement(child, {
                    doRender: index === activeIndex,
                });
            })}
        </Box>
    );
}
