import { DeepPartial, UseFormReset } from 'react-hook-form';
import {
    H3,
    PageContentContainer,
    Tabs,
    TabOption,
} from '@/lib/shared/components/ui';
import { TherifyUser } from '@/lib/shared/types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { AccountView, AccountForm, AccountViewProps } from './views';

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
    onUpdateUserDetails: (
        data: AccountForm,
        reset: UseFormReset<AccountForm>
    ) => void;
    onImageUploadError: AccountViewProps['onImageUploadError'];
    onImageUploadSuccess: AccountViewProps['onImageUploadSuccess'];
    defaultAccountDetails?: DeepPartial<AccountForm>;
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
    onUpdateUserDetails,
    defaultAccountDetails,
}: SettingsPageProps) => {
    return (
        <PageContainer>
            <InnerContainer>
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
                        <AccountView
                            onImageUploadError={() => {}}
                            onImageUploadSuccess={() => {}}
                            imageUrl={user?.avatarUrl}
                            onUpdateUserDetails={onUpdateUserDetails}
                            defaultAccountDetails={defaultAccountDetails}
                        />
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
            </InnerContainer>
        </PageContainer>
    );
};

const TabContent = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
}));

const PageContainer = styled(PageContentContainer)(({ theme }) => ({
    padding: theme.spacing(8),
    paddingTop: theme.spacing(10),
    height: '100%',
    width: '100%',
    overflow: 'auto',
    maxWidth: '100% !important',
}));

const InnerContainer = styled(Box)({
    width: '100%',
    maxWidth: '1448px',
    margin: 'auto',
});
