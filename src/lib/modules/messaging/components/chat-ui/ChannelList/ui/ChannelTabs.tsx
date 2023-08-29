import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

interface ChannelTabsProps {
    tabs: string[];
    activeTab: string;
    handleTabSelect: (tab: string) => void;
}
export const ChannelTabs = ({
    tabs,
    activeTab,
    handleTabSelect,
}: ChannelTabsProps) => {
    return (
        <TabsContainer
            value={activeTab}
            onChange={(_, tabValue) => handleTabSelect(tabValue)}
        >
            {tabs.map((tab) => (
                <ChannelTab key={'channel-' + tab} label={tab} value={tab} />
            ))}
        </TabsContainer>
    );
};

const TAB_HEIGHT = 32 as const;

const TabsContainer = styled(Tabs)(({ theme }) => {
    const containerHeight = TAB_HEIGHT + 8;
    return {
        background: theme.palette.grey[50],
        height: `${containerHeight}px`,
        borderRadius: `${containerHeight / 2}px`,
        '& .MuiTabs-flexContainer': {
            height: '100%',
            padding: '8px',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.common.black,
            height: `${TAB_HEIGHT}px`,
            borderRadius: `${TAB_HEIGHT}px`,
            marginBottom: '8px',
            zIndex: 1,
        },
    };
});

const ChannelTab = styled((props: TabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    height: `${TAB_HEIGHT}px`,
    minHeight: `${TAB_HEIGHT}px`,
    borderRadius: `${TAB_HEIGHT / 2}px`,
    textTransform: 'none',
    flex: 1,
    color: theme.palette.text.primary,
    position: 'relative',
    zIndex: 2,
    '&:hover': {
        background: theme.palette.grey[100],
    },
    '&.Mui-selected': {
        color: theme.palette.common.white,
        '&:hover': {
            background: 'transparent',
        },
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));
