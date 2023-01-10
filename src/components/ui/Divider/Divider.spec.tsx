import { render } from '@testing-library/react';
import { Divider } from './index';

describe('Divider', () => {
    it('renders', () => {
        const { getByTestId } = render(<Divider data-testid="divider" />);
        expect(getByTestId('divider')).toBeVisible();
    });
});
