import { render } from '@testing-library/react';
import { ApplicationContainer } from './ApplicationContainer';
describe('ApplicationContainer', () => {
    it('renders children', () => {
        const { getByText } = render(
            <ApplicationContainer>
                <div>Hello World</div>
            </ApplicationContainer>
        );
        expect(getByText('Hello World')).toBeVisible();
    });

    it('has view styling', () => {
        const { getByTestId } = render(
            <ApplicationContainer data-testid="container"></ApplicationContainer>
        );
        expect(getByTestId('container')).toHaveStyle(
            'height: 100vh; width: 100vw; position: relative'
        );
    });
});
