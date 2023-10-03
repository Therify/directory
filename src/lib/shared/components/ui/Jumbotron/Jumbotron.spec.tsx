import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Jumbotron, TEST_IDS } from './Jumbotron';

describe('Jumbotron', () => {
    it('should render', () => {
        const { getByTestId } = renderWithTheme(<Jumbotron headerText="Test" />);
        const container = getByTestId(TEST_IDS.CONTAINER);
        expect(container).toBeVisible();
    });
    it('should render header text', () => {
        const { getByText } = renderWithTheme(<Jumbotron headerText='Test text' />);
        const header = getByText(/test text/i);
        expect(header).toBeVisible();
    });
    it('should render subheader text', () => {
        const { getByText } = renderWithTheme(<Jumbotron headerText='Test text' subHeaderText='Other text' />);
        const header = getByText(/other text/i);
        expect(header).toBeVisible();
    });
    it('should render call callback fn when button is clicked', () => {
        const buttonCallback = jest.fn();
        const { getByText } = renderWithTheme(<Jumbotron headerText='Test text' callToAction={{ label: 'Some button', onClick: buttonCallback }} />);
        const button = getByText(/some button/i);
        button.click();
        expect(buttonCallback).toHaveBeenCalled();
    });
});
