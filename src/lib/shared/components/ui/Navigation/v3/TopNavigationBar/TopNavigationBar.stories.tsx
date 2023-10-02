import { Meta, StoryFn } from '@storybook/react';
import { TopNavigationBar as TopNavigationBarUi } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

export default {
    title: 'V3/Navigation/TopNavigationBar',
    component: TopNavigationBarUi,
    argTypes: {},
} as Meta;

export const TopNavigationBar: StoryFn = () => {
    return <TopNavigationBarUi {...mockTopNavigationBarProps} />;
};
export const TopNavigationBarLoggedIn: StoryFn = () => {
    return <TopNavigationBarUi {...mockTopNavigationBarProps} />;
};
export const TopNavigationBarLoadingUser: StoryFn = () => {
    return <TopNavigationBarUi {...mockTopNavigationBarProps} isLoadingUser />;
};

export const WithNotifications: StoryFn = () => {
    return (
        <TopNavigationBarUi
            {...{ ...mockTopNavigationBarProps, notificationCount: 1 }}
        />
    );
};
