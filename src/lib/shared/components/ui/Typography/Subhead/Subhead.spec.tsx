import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { therifyDesignSystem } from '../../../themes/therify-design-system';
import { Subhead, SUBHEAD_SIZE } from './index';

describe('Subhead', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    it('should render', () => {
        render(<Subhead>{text}</Subhead>);
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toBeInTheDocument();
        expect(subheadEl.nodeName).toBe('H2');
    });

    it('should default to medium size', () => {
        renderWithTheme(<Subhead>{text}</Subhead>, therifyDesignSystem);
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.subtitle3.fontSize}`
        );
        expect(subheadEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.subtitle3.lineHeight}`
        );
    });

    it('should render with large size', () => {
        renderWithTheme(
            <Subhead size={SUBHEAD_SIZE.LARGE}>{text}</Subhead>,
            therifyDesignSystem
        );
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.subtitle4.fontSize}`
        );
        expect(subheadEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.subtitle4.lineHeight}`
        );
    });

    it('should render with medium size', () => {
        renderWithTheme(
            <Subhead size={SUBHEAD_SIZE.MEDIUM}>{text}</Subhead>,
            therifyDesignSystem
        );
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.subtitle3.fontSize}`
        );
        expect(subheadEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.subtitle3.lineHeight}`
        );
    });

    it('should render with small size', () => {
        renderWithTheme(
            <Subhead size={SUBHEAD_SIZE.SMALL}>{text}</Subhead>,
            therifyDesignSystem
        );
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.subtitle2.fontSize}`
        );
        expect(subheadEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.subtitle2.lineHeight}`
        );
    });

    it('should render with extra small size', () => {
        renderWithTheme(
            <Subhead size={SUBHEAD_SIZE.EXTRA_SMALL}>{text}</Subhead>,
            therifyDesignSystem
        );
        const subheadEl = screen.getByText(text);
        expect(subheadEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.subtitle1.fontSize}`
        );
        expect(subheadEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.subtitle1.lineHeight}`
        );
    });
});
