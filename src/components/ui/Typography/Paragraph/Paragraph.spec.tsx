import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import {
    Paragraph,
    ParagraphFontWeight,
    PARAGRAPH_SIZE,
    PARAGRAPH_TEXT_DECORATION,
} from './index';

describe('Paragraph', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    it('should render', () => {
        const { getByText } = renderWithTheme(<Paragraph>{text}</Paragraph>);
        const p = getByText(text);
        expect(p).toBeVisible();
        expect(p.nodeName).toBe('P');
    });

    it('should default to medium size', () => {
        const { getByText, theme } = renderWithTheme(
            <Paragraph>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle(`font-size: ${theme.typography.body2.fontSize}`);
        expect(p).toHaveStyle(
            `line-height: ${theme.typography.body2.lineHeight}`
        );
    });

    it('should render with large size', () => {
        const { getByText, theme } = renderWithTheme(
            <Paragraph size={PARAGRAPH_SIZE.LARGE}>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle(`font-size: ${theme.typography.body3.fontSize}`);
        expect(p).toHaveStyle(
            `line-height: ${theme.typography.body3.lineHeight}`
        );
    });

    it('should render with medium size', () => {
        const { getByText, theme } = renderWithTheme(
            <Paragraph size={PARAGRAPH_SIZE.MEDIUM}>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle(`font-size: ${theme.typography.body2.fontSize}`);
        expect(p).toHaveStyle(
            `line-height: ${theme.typography.body2.lineHeight}`
        );
    });

    it('should render with small size', () => {
        const { getByText, theme } = renderWithTheme(
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle(`font-size: ${theme.typography.body1.fontSize}`);
        expect(p).toHaveStyle(
            `line-height: ${theme.typography.body1.lineHeight}`
        );
    });

    it('should pass font weight', () => {
        const { getByText } = renderWithTheme(
            <Paragraph fontWeight={ParagraphFontWeight.Bold}>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle('font-weight: bold');
    });

    it('should accept bold flag', () => {
        const { getByText } = renderWithTheme(
            <Paragraph bold>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle('font-weight: bold');
    });

    it('should override font-weight when bold flag present', () => {
        const { getByText } = renderWithTheme(
            <Paragraph bold fontWeight={ParagraphFontWeight.Medium}>
                {text}
            </Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle('font-weight: bold');
    });

    it('should pass text decoration', () => {
        const { getByText } = renderWithTheme(
            <Paragraph textDecoration={PARAGRAPH_TEXT_DECORATION.UNDERLINE}>
                {text}
            </Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle('text-decoration: underline');
    });

    it('should default text decoration to "none"', () => {
        const { getByText } = renderWithTheme(<Paragraph>{text}</Paragraph>);
        const p = getByText(text);
        expect(p).toHaveStyle('text-decoration: none');
    });

    it('should italicise', () => {
        const { getByText } = renderWithTheme(
            <Paragraph italic>{text}</Paragraph>
        );
        const p = getByText(text);
        expect(p).toHaveStyle('font-style: italic');
    });
});
