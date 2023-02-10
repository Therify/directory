import { Upload as UploadIcon } from '@mui/icons-material';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { BUTTON_SIZE, IconButton } from './index';
describe('Button', () => {
    const icon = <UploadIcon data-testid="icon" />;
    it('renders button icon', () => {
        const { getByTestId } = renderWithTheme(
            <IconButton data-testid="button">{icon}</IconButton>
        );
        expect(getByTestId('button')).toBeInTheDocument();
        expect(getByTestId('icon')).toBeInTheDocument();
    });

    it('can be clicked', async () => {
        const clickHandler = jest.fn();
        const user = userEvent.setup();
        const { getByTestId } = renderWithTheme(
            <IconButton data-testid="button" onClick={clickHandler}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        await user.click(button);
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('cannot be clicked when disabled', async () => {
        const clickHandler = jest.fn();
        const user = userEvent.setup();
        const { getByTestId } = renderWithTheme(
            <IconButton data-testid="button" disabled onClick={clickHandler}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        try {
            await user.click(button);
            expect(0).toBe(1);
        } catch (e) {
            expect(button).toHaveStyle('pointer-events: none');
            expect(clickHandler).not.toHaveBeenCalled();
        }
    });

    it('displays small sized button', () => {
        const { getByTestId, theme } = renderWithTheme(
            <IconButton data-testid="button" size={BUTTON_SIZE.SMALL}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        expect(button).toHaveStyle(`padding: ${theme.spacing(2)}`);
    });

    it('displays medium sized button', () => {
        const { getByTestId, theme } = renderWithTheme(
            <IconButton data-testid="button" size={BUTTON_SIZE.MEDIUM}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        expect(button).toHaveStyle(`padding: ${theme.spacing(3)}`);
    });

    it('displays large sized button', () => {
        const { getByTestId, theme } = renderWithTheme(
            <IconButton data-testid="button" size={BUTTON_SIZE.LARGE}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        expect(button).toHaveStyle(`padding: ${theme.spacing(4)}`);
    });

    it('displays xlarge sized button', () => {
        const { getByTestId, theme } = renderWithTheme(
            <IconButton data-testid="button" size={BUTTON_SIZE.XLARGE}>
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        expect(button).toHaveStyle(`padding: ${theme.spacing(5)}`);
    });

    it('overwrites styles when passed as props', () => {
        const { getByTestId } = renderWithTheme(
            <IconButton
                data-testid="button"
                size={BUTTON_SIZE.XLARGE}
                style={{ padding: '50px' }}
            >
                {icon}
            </IconButton>
        );
        const button = getByTestId('button');
        expect(button).toHaveStyle('padding: 50px');
    });
});
