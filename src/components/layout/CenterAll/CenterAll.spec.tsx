import { render } from '@testing-library/react';
import { CenterAll, TEST_IDS } from './CenterAll';
import { HelloWorld } from '@/components';

describe('CenterAll', () => {
    it('should render', () => {
        const { getByTestId } = render(<CenterAll>test</CenterAll>);
        expect(getByTestId(TEST_IDS.ROOT)).toBeInTheDocument();
    });
    it('should render children', function () {
        const { getByTestId } = render(
            <CenterAll>
                <HelloWorld language="en" />
            </CenterAll>
        );
        expect(getByTestId(TEST_IDS.ROOT)).toContainElement(
            getByTestId('hello-world-root')
        );
    });
    it('should have expected styles', function () {
        const { getByTestId } = render(<CenterAll>test</CenterAll>);
        const element = getByTestId(TEST_IDS.ROOT);
        expect(element).toHaveStyle({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
        });
    });
});
