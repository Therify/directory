import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface TabOption {
    id: string;
    tabLabel: string;
    disabled?: boolean;
    icon?: ReactNode;
}

interface TabProps {
    selectedTab: string;
    onTabChange: (tabId: string) => void;
    ariaLabel?: string;
    tabs: TabOption[];
    withBottomBorder?: boolean;
    v3?: boolean;
}

export const TEST_IDS = {
    BOTTOM_BORDER: 'bottom-border',
} as const;

export const Tabs = ({
    selectedTab,
    onTabChange,
    ariaLabel,
    tabs,
    withBottomBorder,
    v3,
}: TabProps) => {
    const theme = useTheme();
    const handleChange = (_: React.SyntheticEvent, newTabId: string) => {
        onTabChange(newTabId);
    };

    return (
        <MuiTabs
            value={selectedTab}
            onChange={handleChange}
            aria-label={ariaLabel ?? 'Default tabs list'}
            // TODO: Handle maxwidths for scrolling once breakpoints are implemented
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                ...(v3 && {
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.text.primary,
                    },
                }),
            }}
        >
            {tabs.map(({ id, tabLabel, disabled, icon }) => (
                <MuiTab
                    key={id}
                    disabled={disabled}
                    label={tabLabel}
                    value={id}
                    aria-controls={`tabpanel-${id}`}
                    icon={
                        icon ? (
                            <Box marginLeft={theme.spacing(2)}>{icon}</Box>
                        ) : undefined
                    }
                    iconPosition="end"
                    sx={{
                        padding: theme.spacing(4, 6),
                        lineHeight: 1,
                        textTransform: 'none',
                        ...(v3 && {
                            color: theme.palette.grey[500],
                            '&.Mui-selected': {
                                color: theme.palette.text.primary,
                            },
                        }),
                    }}
                />
            ))}
            {withBottomBorder && (
                <BottomBorder data-testid={TEST_IDS.BOTTOM_BORDER} />
            )}
        </MuiTabs>
    );
};

const BottomBorder = styled('hr')(({ theme }) => ({
    color: theme.palette.divider,
    borderColor: theme.palette.divider,
    border: 'none',
    borderBottom: `1px solid`,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 0,
}));
