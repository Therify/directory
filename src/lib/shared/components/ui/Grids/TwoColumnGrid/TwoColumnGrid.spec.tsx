import { render, within } from '@testing-library/react';
import { TEST_IDS, TwoColumnGrid } from './index';

describe('TwoColumnGrid', () => {
    it('renders leftSlot content', () => {
        const { getByTestId } = render(
            <TwoColumnGrid leftSlot={<div>Test</div>} />
        );
        const leftSlot = getByTestId(TEST_IDS.LEFT_SLOT);
        expect(within(leftSlot).getByText('Test')).toBeVisible();
    });

    it('renders rightSlot content', () => {
        const { getByTestId } = render(
            <TwoColumnGrid rightSlot={<div>Test</div>} />
        );
        const rightSlot = getByTestId(TEST_IDS.RIGHT_SLOT);
        expect(within(rightSlot).getByText('Test')).toBeVisible();
    });

    it('renders leftSlot style', () => {
        const { getByTestId } = render(
            <TwoColumnGrid leftSlotSx={{ background: 'red' }} />
        );
        const leftSlotItem = getByTestId(TEST_IDS.LEFT_SLOT);
        expect(leftSlotItem).toHaveStyle('background: red');
    });

    it('renders rightSlot style', () => {
        const { getByTestId } = render(
            <TwoColumnGrid rightSlotSx={{ background: 'red' }} />
        );
        const rightSlotItem = getByTestId(TEST_IDS.RIGHT_SLOT);
        expect(rightSlotItem).toHaveStyle('background: red');
    });
});
