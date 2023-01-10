import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Button, BUTTON_SIZE, TEST_IDS } from './index';
describe('Button', () => {
    const text = 'Click Me';
    it('renders button text', () => {
        const { getByText } = renderWithTheme(<Button>{text}</Button>);
        expect(getByText(text)).toBeInTheDocument();
    });

    it('can be clicked', async () => {
        const clickHandler = jest.fn();
        const user = userEvent.setup();
        const { getByText } = renderWithTheme(
            <Button onClick={clickHandler}>{text}</Button>
        );
        const button = getByText(text);
        await user.click(button);
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('cannot be clicked when disabled', async () => {
        const clickHandler = jest.fn();
        const user = userEvent.setup();
        const { getByText } = renderWithTheme(
            <Button disabled onClick={clickHandler}>
                {text}
            </Button>
        );
        const button = getByText(text);
        try {
            await user.click(button);
            expect(0).toBe(1);
        } catch (e) {
            expect(button).toHaveStyle('pointer-events: none');
            expect(clickHandler).not.toHaveBeenCalled();
        }
    });

    it('displays default loader', () => {
        const { getByTestId, queryByText } = renderWithTheme(
            <Button isLoading>{text}</Button>
        );
        expect(getByTestId(TEST_IDS.LOGIN_LOADER)).toBeVisible();
        expect(queryByText(text)).not.toBeInTheDocument();
    });

    it('displays loading text', () => {
        const { queryByText } = renderWithTheme(
            <Button isLoading loadingSlot="Loading">
                {text}
            </Button>
        );
        expect(queryByText('Loading')).toBeInTheDocument();
        expect(queryByText(text)).not.toBeInTheDocument();
    });

    it('displays small sized button', () => {
        const { getByText, theme } = renderWithTheme(
            <Button size={BUTTON_SIZE.SMALL}>{text}</Button>
        );
        const button = getByText(text);
        expect(button).toHaveStyle('font-size: 1rem');
        expect(button).toHaveStyle(`padding: ${theme.spacing(3, 4)}`);
    });

    it('displays medium sized button', () => {
        const { getByText, theme } = renderWithTheme(
            <Button size={BUTTON_SIZE.MEDIUM}>{text}</Button>
        );
        const button = getByText(text);
        expect(button).toHaveStyle('font-size: 1rem');
        expect(button).toHaveStyle(`padding: ${theme.spacing(4, 6)}`);
    });

    it('displays large sized button', () => {
        const { getByText, theme } = renderWithTheme(
            <Button size={BUTTON_SIZE.LARGE}>{text}</Button>
        );
        const button = getByText(text);
        expect(button).toHaveStyle('font-size: 1.125rem');
        expect(button).toHaveStyle(`padding: ${theme.spacing(4, 8)}`);
    });

    it('displays xlarge sized button', () => {
        const { getByText, theme } = renderWithTheme(
            <Button size={BUTTON_SIZE.XLARGE}>{text}</Button>
        );
        const button = getByText(text);
        expect(button).toHaveStyle('font-size: 1.375rem');
        expect(button).toHaveStyle(`padding: ${theme.spacing(5, 9)}`);
    });

    it('overwrites styles when passed as props', () => {
        const { getByText } = renderWithTheme(
            <Button size={BUTTON_SIZE.XLARGE} style={{ fontSize: '100rem' }}>
                {text}
            </Button>
        );
        const button = getByText(text);
        expect(button).toHaveStyle('font-size: 100rem');
    });
});
