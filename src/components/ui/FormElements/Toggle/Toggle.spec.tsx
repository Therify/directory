import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../fixtures/renderWithTheme';
import { TEST_IDS, Toggle, ToggleType } from './index';

describe('Toggle', () => {
    const user = userEvent.setup();
    it('should render label', () => {
        const { getByText } = renderWithTheme(<Toggle displayText="Test" />);
        expect(getByText('Test')).toBeVisible();
    });

    it('should disable', () => {
        const { getByTestId } = renderWithTheme(<Toggle disabled />);
        expect(getByTestId(TEST_IDS.CONTROL_ELEMENT)).toHaveAttribute(
            'aria-disabled',
            'true'
        );
    });

    it('should call onChange handler when changed', async () => {
        const onChange = jest.fn();
        const { getByTestId } = renderWithTheme(
            <Toggle
                type={ToggleType.Checkbox}
                displayText="Text"
                onChange={onChange}
            />
        );
        const checkbox = getByTestId(TEST_IDS.CONTROL_ELEMENT);
        await user.click(checkbox);
        expect(onChange).toHaveBeenCalled();
    });

    describe('Checkbox', () => {
        it('should render checkbox unchecked', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle type={ToggleType.Checkbox} displayText="Text" />
            );
            expect(getByTestId('CheckBoxOutlineBlankIcon')).toBeVisible();
        });
        it('should render checkbox checked', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle type={ToggleType.Checkbox} checked displayText="Text" />
            );
            expect(getByTestId('CheckBoxIcon')).toBeVisible();
        });

        it('renders unchecked color', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Toggle
                    type={ToggleType.Checkbox}
                    displayText="Text"
                    uncheckedColor="error"
                />
            );
            expect(getByTestId('CheckBoxOutlineBlankIcon')).toHaveStyle(
                `fill: ${theme.palette.error.main}`
            );
        });

        it('renders checked color', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Toggle
                    type={ToggleType.Checkbox}
                    displayText="Text"
                    checkedColor="success"
                    checked
                />
            );
            expect(getByTestId('CheckBoxIcon')).toHaveStyle(
                `fill: ${theme.palette.success.main}`
            );
        });
    });

    describe('Radio', () => {
        it('should render radio unchecked', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle type={ToggleType.Radio} displayText="Text" />
            );
            expect(getByTestId('RadioButtonUncheckedIcon')).toBeVisible();
        });
        it('should render radio checked', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle type={ToggleType.Radio} checked displayText="Text" />
            );
            expect(getByTestId('RadioButtonCheckedIcon')).toBeVisible();
        });

        it('renders unchecked color', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Toggle
                    type={ToggleType.Radio}
                    displayText="Text"
                    uncheckedColor="warning"
                />
            );
            expect(getByTestId('RadioButtonUncheckedIcon')).toHaveStyle(
                `fill: ${theme.palette.warning.main}`
            );
        });

        it('renders checked color', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Toggle
                    type={ToggleType.Radio}
                    displayText="Text"
                    checkedColor="info"
                    checked
                />
            );
            expect(getByTestId('RadioButtonCheckedIcon')).toHaveStyle(
                `fill: ${theme.palette.info.main}`
            );
        });
    });

    describe('Switch', () => {
        it('renders a switch', () => {
            const { container } = renderWithTheme(
                <Toggle type={ToggleType.Switch} />
            );
            const switchEl =
                container.getElementsByClassName('MuiSwitch-root')[0] ?? [];
            expect(switchEl).toBeVisible();
        });

        it('passes unchecked state to switch', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle checked={false} type={ToggleType.Switch} />
            );
            expect(getByTestId(TEST_IDS.CONTROL_ELEMENT)).not.toHaveClass(
                'Mui-checked'
            );
        });

        it('passes checked state switch', () => {
            const { getByTestId } = renderWithTheme(
                <Toggle checked type={ToggleType.Switch} />
            );
            expect(getByTestId(TEST_IDS.CONTROL_ELEMENT)).toHaveClass(
                'Mui-checked'
            );
        });

        it('passes unchecked color to switch', () => {
            const { container, theme } = renderWithTheme(
                <Toggle type={ToggleType.Switch} uncheckedColor="secondary" />
            );
            const track =
                container.getElementsByClassName('MuiSwitch-track')[0];
            expect(track).toHaveStyle(
                `background-color: ${theme.palette.secondary.main}`
            );
        });

        it('passes checked color to switch', () => {
            const { container, theme } = renderWithTheme(
                <Toggle checked type={ToggleType.Switch} checkedColor="info" />
            );
            const track =
                container.getElementsByClassName('MuiSwitch-track')[0];
            expect(track).toHaveStyle(`background: ${theme.palette.info.main}`);
        });

        it('passes size to switch', () => {
            const trackHeight = 10;
            const { container } = renderWithTheme(
                <Toggle type={ToggleType.Switch} switchSize={{ trackHeight }} />
            );
            const track = container.getElementsByClassName('MuiSwitch-root')[0];
            expect(track).toHaveStyle(`height: ${trackHeight}px`);
        });
    });
});
