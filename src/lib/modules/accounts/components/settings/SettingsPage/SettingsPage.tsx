import {
    H3,
    PageContentContainer,
    Tabs,
    TabOption,
} from '@/lib/shared/components/ui';
import { TherifyUser } from '@/lib/shared/types';
import { styled } from '@mui/material/styles';

export const SETTINGS_TAB_IDS = {
    ACCOUNT: 'account',
    CARE_DETAILS: 'care-details',
    BILLING: 'billing',
    NOTIFICATIONS: 'notifications',
} as const;
export type SettingsTabId =
    (typeof SETTINGS_TAB_IDS)[keyof typeof SETTINGS_TAB_IDS];
interface SettingsPageProps {
    user: TherifyUser.TherifyUser;
    currentTab: SettingsTabId;
    onTabChange: (tabId: SettingsTabId) => void;
}
const tabs: TabOption[] = [
    { id: SETTINGS_TAB_IDS.ACCOUNT, tabLabel: 'Account' },
    { id: SETTINGS_TAB_IDS.CARE_DETAILS, tabLabel: 'Care Details' },
    { id: SETTINGS_TAB_IDS.BILLING, tabLabel: 'Billing & Payments' },
    { id: SETTINGS_TAB_IDS.NOTIFICATIONS, tabLabel: 'Email Notifications' },
];

export const TEST_IDS = {
    ACCOUNT_TAB: 'account',
    CARE_DETAILS_TAB: 'care-details',
    BILLING_TAB: 'billing',
    NOTIFICATIONS_TAB: 'notifications',
} as const;
export const SettingsPage = ({
    user,
    currentTab,
    onTabChange,
}: SettingsPageProps) => {
    return (
        <PageContentContainer padding={8} paddingTop={10} maxWidth={1448}>
            <H3 marginBottom={10}>Settings</H3>
            <Tabs
                v3
                selectedTab={currentTab}
                onTabChange={(tabId) => onTabChange(tabId as SettingsTabId)}
                ariaLabel="Settings tabs"
                withBottomBorder
                tabs={tabs}
            />
            {currentTab === SETTINGS_TAB_IDS.ACCOUNT && (
                <TabContent data-testid={TEST_IDS.ACCOUNT_TAB}>
                    {/* TODO: Add Account view */}
                </TabContent>
            )}
            {currentTab === SETTINGS_TAB_IDS.CARE_DETAILS && (
                <TabContent data-testid={TEST_IDS.CARE_DETAILS_TAB}>
                    {/* TODO: Add Care Details view */}
                </TabContent>
            )}
            {currentTab === SETTINGS_TAB_IDS.BILLING && (
                <TabContent data-testid={TEST_IDS.BILLING_TAB}>
                    {/* TODO: Add Billing & Payments view */}
                </TabContent>
            )}
            {currentTab === SETTINGS_TAB_IDS.NOTIFICATIONS && (
                <TabContent data-testid={TEST_IDS.NOTIFICATIONS_TAB}>
                    {/* TODO: Add Email Notifications view */}
                </TabContent>
            )}
        </PageContentContainer>
    );
};

const TabContent = styled('div')();
