import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Jumbotron, TEST_IDS } from './Jumbotron';

describe('Jumbotron', () => {
    it('should render', () => {
        const { getByTestId } = renderWithTheme(
            <Jumbotron
                headerText="Test"
                backgroundProps={{ backgroundImageUrl: 'hi' }}
            />
        );
        const container = getByTestId(TEST_IDS.CONTAINER);
        expect(container).toBeVisible();
        console.log('hi');
    });
    it('should render header text', () => {
        const { getByText } = renderWithTheme(
            <Jumbotron
                headerText="Test text"
                backgroundProps={{ backgroundImageUrl: 'hi' }}
            />
        );
        const header = getByText(/test text/i);
        expect(header).toBeVisible();
    });
    it('should render subheader text', () => {
        const { getByText } = renderWithTheme(
            <Jumbotron
                headerText="Test text"
                subHeaderText="Other text"
                backgroundProps={{ backgroundImageUrl: 'hi' }}
            />
        );
        const header = getByText(/other text/i);
        expect(header).toBeVisible();
    });
    it('should use celebration styling when respective prop is true', () => {
        const { getByTestId } = renderWithTheme(
            <Jumbotron
                headerText="Test text"
                backgroundProps={{ useCelebrationStyling: true }}
            />
        );
        const celebrationBackground = getByTestId(TEST_IDS.CELEBRATION);
        expect(celebrationBackground).toHaveStyle({
            background: /linear-gradient.*/,
        });
    });
    it('should call callback fn when button is clicked', () => {
        const buttonCallback = jest.fn();
        const { getByText } = renderWithTheme(
            <Jumbotron
                headerText="Test text"
                callToAction={{ label: 'Some button', onClick: buttonCallback }}
                backgroundProps={{ backgroundImageUrl: 'hi' }}
            />
        );
        const button = getByText(/some button/i);
        button.click();
        expect(buttonCallback).toHaveBeenCalled();
    });
});
