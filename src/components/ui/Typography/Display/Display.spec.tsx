import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { therifyDesignSystem } from '../../../themes/therify-design-system';
import { Display, DISPLAY_SIZE, DISPLAY_ELEMENT } from './index';

describe('Display', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    it('should render as H1 by default', () => {
        render(<Display>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H1');
    });

    it('should render as h1 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H1}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H1');
    });

    it('should render as h2 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H2}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H2');
    });

    it('should render as h3 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H3}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H3');
    });

    it('should render as h4 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H4}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H4');
    });

    it('should render as h5 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H5}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H5');
    });

    it('should render as h6 tag', () => {
        render(<Display as={DISPLAY_ELEMENT.H6}>{text}</Display>);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toBeVisible();
        expect(DisplayEl.nodeName).toBe('H6');
    });

    it('should render to medium size by default', () => {
        renderWithTheme(<Display>{text}</Display>, therifyDesignSystem);
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.display.fontSize}`
        );
        expect(DisplayEl).toHaveStyle(
            `line-height:  ${therifyDesignSystem.typography.display.lineHeight}`
        );
    });

    it('should render with large size', () => {
        renderWithTheme(
            <Display size={DISPLAY_SIZE.LARGE}>{text}</Display>,
            therifyDesignSystem
        );
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.displayLarge.fontSize}`
        );
        expect(DisplayEl).toHaveStyle(
            `line-height:  ${therifyDesignSystem.typography.displayLarge.lineHeight}`
        );
    });

    it('should render with medium size', () => {
        renderWithTheme(
            <Display size={DISPLAY_SIZE.MEDIUM}>{text}</Display>,
            therifyDesignSystem
        );
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.display.fontSize}`
        );
        expect(DisplayEl).toHaveStyle(
            `line-height:  ${therifyDesignSystem.typography.display.lineHeight}`
        );
    });

    it('should render with small size', () => {
        renderWithTheme(
            <Display size={DISPLAY_SIZE.SMALL}>{text}</Display>,
            therifyDesignSystem
        );
        const DisplayEl = screen.getByText(text);
        expect(DisplayEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.displaySmall.fontSize}`
        );
        expect(DisplayEl).toHaveStyle(
            `line-height:  ${therifyDesignSystem.typography.displaySmall.lineHeight}`
        );
    });
});
