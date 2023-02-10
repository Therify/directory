import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { therifyDesignSystem } from '../../themes/therify-design-system';
import { List, TEST_IDS } from './index';

//TODO: Fix these tests
describe.skip('List', () => {
    const items = [
        <p key="0">Item 0</p>,
        <p key="1">Item 1</p>,
        <p key="2">Item 2</p>,
    ];
    it('renders all items', () => {
        const { getByText } = renderWithTheme(<List />);
        expect(getByText('Item 0')).toBeInTheDocument();
        expect(getByText('Item 1')).toBeInTheDocument();
        expect(getByText('Item 2')).toBeInTheDocument();
    });

    it('renders list border by default', () => {
        const { getByTestId } = renderWithTheme(<List />);
        const list = getByTestId(TEST_IDS.LIST);
        expect(list).toHaveStyle(
            `border: 1px solid ${therifyDesignSystem.palette.divider}`
        );
    });

    it('removes list border', () => {
        const { getByTestId } = renderWithTheme(<List />);
        const list = getByTestId(TEST_IDS.LIST);
        expect(list).toHaveStyle('border: none');
    });

    it('removes list item separators', () => {
        const { getByText } = renderWithTheme(
            <List withItemSeparator={false} />
        );
        expect(getByText('Item 0')).toHaveStyle('border: none');
    });

    it('does not render list item separator on last item', () => {
        const { getByText } = renderWithTheme(
            <List withItemSeparator={true} />
        );
        expect(getByText('Item 2')).toHaveStyle('border: none');
    });
});
