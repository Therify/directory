import { render } from '@testing-library/react';
import { CenteredContainer } from './index';
describe('CenteredContainer', () => {
    it('renders children', () => {
        const { getByText } = render(
            <CenteredContainer>
                <div>Hello World</div>
            </CenteredContainer>
        );
        expect(getByText('Hello World')).toBeVisible();
    });
});
