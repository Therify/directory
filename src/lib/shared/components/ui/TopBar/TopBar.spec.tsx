import { render } from '@testing-library/react';
import { TopBar } from './TopBar';

describe('TopBar', () => {
    it('renders leftSlot content', () => {
        const { getByText } = render(<TopBar leftSlot={<div>Left</div>} />);
        expect(getByText('Left')).toBeVisible();
    });

    it('renders rightSlot content', () => {
        const { getByText } = render(<TopBar rightSlot={<div>Right</div>} />);
        expect(getByText('Right')).toBeVisible();
    });
});
