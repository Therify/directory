import { Meta, StoryFn } from '@storybook/react';
import { TopNavigationBar as TopNavigationBarUi } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

export default {
    title: 'Navigation/TopNavigationBar',
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
