import { renderWithTheme } from '../../fixtures';
import { Carousel } from './Carousel';

describe('Carousel', () => {
    it('should render items', () => {
        const { getByTestId } = renderWithTheme(
            <Carousel items={[<div data-testid="test" key={'test-item'} />]} />
        );
        expect(getByTestId('test')).toBeVisible();
    });

    it.todo('write more tests');
});
