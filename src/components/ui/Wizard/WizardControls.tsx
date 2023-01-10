import { Button } from '../Button';
import { WizardChildProps, WizardControlsProps } from './types';

export function WizardControls({
    hasNext,
    hasPrevious,
    previous,
    next,
    renderNext,
    renderPrevious,
}: WizardChildProps & {
    renderNext?: WizardControlsProps;
    renderPrevious?: WizardControlsProps;
}) {
    return (
        <div className="flex">
            {renderPrevious ? (
                renderPrevious({ hasNext, hasPrevious, previous, next })
            ) : (
                <Button disabled={!hasPrevious} onClick={previous}>
                    Prev
                </Button>
            )}
            {renderNext ? (
                renderNext({ hasNext, hasPrevious, previous, next })
            ) : (
                <Button disabled={!hasNext} onClick={next}>
                    Next
                </Button>
            )}
        </div>
    );
}
