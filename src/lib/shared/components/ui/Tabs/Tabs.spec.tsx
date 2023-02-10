import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { TabOption, Tabs, TEST_IDS } from './index';

const getMockTab = (id: string, options?: Partial<TabOption>): TabOption => ({
    id: `tab-${id}`,
    tabLabel: `Tab ${id}`,
    ...options,
});

describe('Tabs', () => {
    it('renders tab buttons', () => {
        const tabs = [getMockTab('1'), getMockTab('2'), getMockTab('3')];
        const { getByText } = renderWithTheme(
            <Tabs
                tabs={tabs}
                selectedTab={tabs[0].id}
                onTabChange={jest.fn()}
            />
        );
        expect(getByText(tabs[0].tabLabel)).toBeVisible();
        expect(getByText(tabs[1].tabLabel)).toBeVisible();
        expect(getByText(tabs[2].tabLabel)).toBeVisible();
    });

    it('renders tab icons', () => {
        const tab = getMockTab('1', { icon: <div data-testid="tab-icon" /> });

        const { getByTestId } = renderWithTheme(
            <Tabs tabs={[tab]} selectedTab={tab.id} onTabChange={jest.fn()} />
        );
        expect(getByTestId('tab-icon')).toBeInTheDocument();
    });

    it('disables tabs', async () => {
        const user = userEvent.setup();
        const onTabChange = jest.fn();
        const tab = getMockTab('1', { disabled: true });
        const { getByText } = renderWithTheme(
            <Tabs tabs={[tab]} selectedTab={tab.id} onTabChange={onTabChange} />
        );
        const tabButton = getByText(tab.tabLabel);
        try {
            await user.click(tabButton);
            expect(0).toBe(1);
        } catch (e) {
            expect(tabButton).toBeDisabled();
            expect(onTabChange).not.toHaveBeenCalled();
        }
    });

    it('calls onTabChange when tab is clicked', async () => {
        const user = userEvent.setup();
        const onTabChange = jest.fn();
        const tabs = [getMockTab('1'), getMockTab('2')];
        const { getByText } = renderWithTheme(
            <Tabs
                tabs={tabs}
                selectedTab={tabs[0].id}
                onTabChange={onTabChange}
            />
        );
        const tabButton = getByText(tabs[1].tabLabel);
        await user.click(tabButton);
        expect(onTabChange).toHaveBeenCalledTimes(1);
        expect(onTabChange).toHaveBeenCalledWith(tabs[1].id);
    });

    it('does not call onTabChange when selected tab is re-clicked', async () => {
        const user = userEvent.setup();
        const onTabChange = jest.fn();
        const tabs = [getMockTab('1'), getMockTab('2')];
        const { getByText } = renderWithTheme(
            <Tabs
                tabs={tabs}
                selectedTab={tabs[0].id}
                onTabChange={onTabChange}
            />
        );
        const tabButton = getByText(tabs[0].tabLabel);
        await user.click(tabButton);
        expect(onTabChange).not.toHaveBeenCalled();
    });

    it('renders bottom border', () => {
        const tabs = [getMockTab('1'), getMockTab('2')];
        const { getByTestId } = renderWithTheme(
            <Tabs
                tabs={tabs}
                selectedTab={tabs[0].id}
                onTabChange={jest.fn()}
                withBottomBorder
            />
        );
        expect(getByTestId(TEST_IDS.BOTTOM_BORDER)).toBeVisible();
    });

    it("doesn't render bottom border by default", () => {
        const tabs = [getMockTab('1'), getMockTab('2')];
        const { queryByTestId } = renderWithTheme(
            <Tabs
                tabs={tabs}
                selectedTab={tabs[0].id}
                onTabChange={jest.fn()}
            />
        );
        expect(queryByTestId(TEST_IDS.BOTTOM_BORDER)).not.toBeInTheDocument();
    });
});
