import { renderWithTheme } from '../../../../fixtures/renderWithTheme';
import { Switch } from './index';

describe('Switch', () => {
    it('should render switch off when not checked', () => {
        const { getByTestId } = renderWithTheme(
            <Switch data-testid="switch" checked={false} />
        );
        expect(getByTestId('switch')).not.toHaveClass('Mui-checked');
    });
    it('should render switch on when checked', () => {
        const { getByTestId } = renderWithTheme(
            <Switch data-testid="switch" checked />
        );
        expect(getByTestId('switch')).toHaveClass('Mui-checked');
    });

    it('renders unchecked color', () => {
        const { container, theme } = renderWithTheme(
            <Switch uncheckedColor="secondary" />
        );
        const track = container.getElementsByClassName('MuiSwitch-track')[0];
        expect(track).toHaveStyle(
            `background-color: ${theme.palette.secondary.main}`
        );
    });

    it('renders checked color', () => {
        const { container, theme } = renderWithTheme(
            <Switch checked checkedColor="info" />
        );
        const track = container.getElementsByClassName('MuiSwitch-track')[0];
        expect(track).toHaveStyle(`background: ${theme.palette.info.main}`);
    });

    it('calculates switch size', () => {
        const trackHeight = 10;
        const borderSize = 4;
        const thumbSize = trackHeight - borderSize * 2;
        const trackWidth = thumbSize * 2;

        const { container } = renderWithTheme(
            <Switch trackHeight={trackHeight} borderSize={borderSize} />
        );
        const track = container.getElementsByClassName('MuiSwitch-root')[0];
        expect(track).toHaveStyle(`height: ${trackHeight}px`);
        expect(track).toHaveStyle(`width: ${trackWidth}px`);

        const thumb = container.getElementsByClassName('MuiSwitch-thumb')[0];
        expect(thumb).toHaveStyle(`height: ${thumbSize}px`);
        expect(thumb).toHaveStyle(`width: ${thumbSize}px`);
    });
});
