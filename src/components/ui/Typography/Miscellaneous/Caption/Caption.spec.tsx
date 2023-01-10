import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { therifyDesignSystem } from '../../../../themes/therify-design-system';
import { Caption, CAPTION_SIZE } from './index';

describe('Caption', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    it('should render', () => {
        render(<Caption>{text}</Caption>);
        const CaptionEl = screen.getByText(text);
        expect(CaptionEl).toBeVisible();
        expect(CaptionEl.nodeName).toBe('P');
    });

    it('should default to normal size', () => {
        renderWithTheme(<Caption>{text}</Caption>, therifyDesignSystem);
        const CaptionEl = screen.getByText(text);
        expect(CaptionEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.caption.fontSize}`
        );
        expect(CaptionEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.caption.lineHeight}`
        );
    });

    it('should render with normal size', () => {
        renderWithTheme(
            <Caption size={CAPTION_SIZE.NORMAL}>{text}</Caption>,
            therifyDesignSystem
        );
        const CaptionEl = screen.getByText(text);
        expect(CaptionEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.caption.fontSize}`
        );
        expect(CaptionEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.caption.lineHeight}`
        );
    });

    it('should render with small size', () => {
        renderWithTheme(
            <Caption size={CAPTION_SIZE.SMALL}>{text}</Caption>,
            therifyDesignSystem
        );
        const CaptionEl = screen.getByText(text);
        expect(CaptionEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.captionSmall.fontSize}`
        );
        expect(CaptionEl).toHaveStyle(
            `line-height: ${therifyDesignSystem.typography.captionSmall.lineHeight}`
        );
    });
});
