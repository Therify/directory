import { render, screen } from '@testing-library/react';
import { H1, H2, H3, H4, H5, H6 } from './index';

describe('Headers', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    describe('H1', () => {
        it('should render', () => {
            render(<H1>{text}</H1>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H1');
        });
    });
    describe('H2', () => {
        it('should render', () => {
            render(<H2>{text}</H2>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H2');
        });
    });
    describe('H3', () => {
        it('should render', () => {
            render(<H3>{text}</H3>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H3');
        });
    });
    describe('H4', () => {
        it('should render', () => {
            render(<H4>{text}</H4>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H4');
        });
    });
    describe('H5', () => {
        it('should render', () => {
            render(<H5>{text}</H5>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H5');
        });
    });
    describe('H6', () => {
        it('should render', () => {
            render(<H6>{text}</H6>);
            const headerEl = screen.getByText(text);
            expect(headerEl).toBeVisible();
            expect(headerEl.nodeName).toBe('H6');
        });
    });
});
