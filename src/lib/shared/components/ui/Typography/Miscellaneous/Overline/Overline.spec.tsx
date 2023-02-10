import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { therifyDesignSystem } from '../../../../themes/therify-design-system';
import { Overline, OVERLINE_SIZE } from './index';

describe('Overline', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    it('should render', () => {
        render(<Overline>{text}</Overline>);
        const OverlineEl = screen.getByText(text);
        expect(OverlineEl).toBeInTheDocument();
        expect(OverlineEl.nodeName).toBe('SPAN');
    });

    it('should default to medium size', () => {
        renderWithTheme(<Overline>{text}</Overline>, therifyDesignSystem);
        const OverlineEl = screen.getByText(text);
        expect(OverlineEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.overline.fontSize}`
        );
        expect(OverlineEl).toHaveStyle(
            `letter-spacing: ${therifyDesignSystem.typography.overline.letterSpacing}`
        );
    });

    it('should render with large size', () => {
        renderWithTheme(
            <Overline size={OVERLINE_SIZE.LARGE}>{text}</Overline>,
            therifyDesignSystem
        );
        const OverlineEl = screen.getByText(text);
        expect(OverlineEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.overlineLarge.fontSize}`
        );
        expect(OverlineEl).toHaveStyle(
            `letter-spacing: ${therifyDesignSystem.typography.overlineLarge.letterSpacing}`
        );
    });

    it('should render with medium size', () => {
        renderWithTheme(
            <Overline size={OVERLINE_SIZE.MEDIUM}>{text}</Overline>,
            therifyDesignSystem
        );
        const OverlineEl = screen.getByText(text);
        expect(OverlineEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.overline.fontSize}`
        );
        expect(OverlineEl).toHaveStyle(
            `letter-spacing: ${therifyDesignSystem.typography.overline.letterSpacing}`
        );
    });

    it('should render with small size', () => {
        renderWithTheme(
            <Overline size={OVERLINE_SIZE.SMALL}>{text}</Overline>,
            therifyDesignSystem
        );
        const OverlineEl = screen.getByText(text);
        expect(OverlineEl).toHaveStyle(
            `font-size: ${therifyDesignSystem.typography.overlineSmall.fontSize}`
        );
        expect(OverlineEl).toHaveStyle(
            `letter-spacing: ${therifyDesignSystem.typography.overlineSmall.letterSpacing}`
        );
    });
});
