import { BlockQuote, BLOCK_QUOTE_SIZE, TEST_IDS } from './BlockQuote';
import { renderWithTheme } from '../../fixtures/renderWithTheme';

describe('BlockQuote', () => {
    it('renders blockquote text', () => {
        const { getByText } = renderWithTheme(
            <BlockQuote>Blockquote</BlockQuote>
        );
        expect(getByText('Blockquote')).toBeVisible();
    });

    it('renders blockquote with small size', () => {
        const { getByTestId, theme } = renderWithTheme(
            <BlockQuote size={BLOCK_QUOTE_SIZE.SMALL}>Blockquote</BlockQuote>
        );
        expect(getByTestId(TEST_IDS.QUOTE)).toHaveStyle(
            `font-size: ${theme.typography.body1.fontSize}`
        );
    });

    it('renders blockquote with medium size', () => {
        const { getByTestId, theme } = renderWithTheme(
            <BlockQuote size={BLOCK_QUOTE_SIZE.MEDIUM}>Blockquote</BlockQuote>
        );
        expect(getByTestId(TEST_IDS.QUOTE)).toHaveStyle(
            `font-size: ${theme.typography.body2.fontSize}`
        );
    });

    it('renders blockquote with large size', () => {
        const { getByTestId, theme } = renderWithTheme(
            <BlockQuote size={BLOCK_QUOTE_SIZE.LARGE}>Blockquote</BlockQuote>
        );
        expect(getByTestId(TEST_IDS.QUOTE)).toHaveStyle(
            `font-size: ${theme.typography.body3.fontSize}`
        );
    });

    it('renders bold quote', () => {
        const { getByTestId } = renderWithTheme(
            <BlockQuote bold>Blockquote</BlockQuote>
        );
        expect(getByTestId(TEST_IDS.QUOTE)).toHaveStyle('font-weight: bold');
    });

    it('renders italic quote', () => {
        const { getByTestId } = renderWithTheme(
            <BlockQuote italic>Blockquote</BlockQuote>
        );
        expect(getByTestId(TEST_IDS.QUOTE)).toHaveStyle('font-style: italic');
    });
});
