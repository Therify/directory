import { render, within } from '@testing-library/react';
import { TEST_IDS, ThreeColumnGrid } from './index';

describe('ThreeColumnGrid', () => {
    it('renders leftSlot content', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid leftSlot={<div>Test</div>} />
        );
        const leftSlot = getByTestId(TEST_IDS.LEFT_SLOT);
        expect(within(leftSlot).getByText('Test')).toBeVisible();
    });

    it('renders rightSlot content', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid rightSlot={<div>Test</div>} />
        );
        const rightSlot = getByTestId(TEST_IDS.RIGHT_SLOT);
        expect(within(rightSlot).getByText('Test')).toBeVisible();
    });

    it('renders children content in center slot', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid>Content goes here!</ThreeColumnGrid>
        );
        const centerSlot = getByTestId(TEST_IDS.CENTER_SLOT);
        expect(
            within(centerSlot).getByText('Content goes here!')
        ).toBeVisible();
    });

    it('renders leftSlot style', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid leftSlotStyle={{ background: 'red' }} />
        );
        const leftSlotItem = getByTestId(TEST_IDS.LEFT_SLOT);
        expect(leftSlotItem).toHaveStyle('background: red');
    });

    it('renders rightSlot style', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid rightSlotStyle={{ background: 'red' }} />
        );
        const rightSlotItem = getByTestId(TEST_IDS.RIGHT_SLOT);
        expect(rightSlotItem).toHaveStyle('background: red');
    });

    it('renders center slot style', () => {
        const { getByTestId } = render(
            <ThreeColumnGrid centerSlotStyle={{ background: 'red' }} />
        );
        const centerSlotItem = getByTestId(TEST_IDS.CENTER_SLOT);
        expect(centerSlotItem).toHaveStyle('background: red');
    });
});
