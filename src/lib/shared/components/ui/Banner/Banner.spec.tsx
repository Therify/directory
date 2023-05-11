import { Banner, TEST_IDS } from './Banner';
import { renderWithTheme } from '../../fixtures/renderWithTheme';

describe('Banner', () => {
    const mockMessage = 'Hello world';
    const mockUrl = 'therify.co';
    it('renders Banner text', () => {
        const { getByText } = renderWithTheme(<Banner message={mockMessage} />);
        expect(getByText(mockMessage)).toBeVisible();
    });

    it('renders link as href', () => {
        const { getByTestId } = renderWithTheme(
            <Banner message={mockMessage} linkUrl={mockUrl} />
        );
        const linkEl = getByTestId(TEST_IDS.LINK);
        expect(linkEl).toHaveAttribute('href', mockUrl);
    });

    it('renders arrow link text as default', () => {
        const { getByTestId } = renderWithTheme(
            <Banner message={mockMessage} linkUrl={mockUrl} />
        );
        expect(getByTestId(TEST_IDS.ARROW_ICON)).toBeVisible();
    });

    it('renders link text when provided', () => {
        const { getByText, queryByTestId } = renderWithTheme(
            <Banner
                message={mockMessage}
                linkUrl={mockUrl}
                linkText="Click here"
            />
        );
        expect(getByText('Click here')).toBeVisible();
        expect(queryByTestId(TEST_IDS.ARROW_ICON)).toBeNull();
    });

    it('does not render link when no url provided', () => {
        const { queryByTestId } = renderWithTheme(
            <Banner message={mockMessage} />
        );
        expect(queryByTestId(TEST_IDS.LINK)).toBeNull();
    });
});
