import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TopNavigationBar } from './TopNavigationBar';
import { mockTopNavigationBarProps } from './TopNavigationBar.mocks';

export default {
    title: 'Navigation/SiteNavigation',
    component: TopNavigationBar,
    argTypes: {},
} as ComponentMeta<typeof TopNavigationBar>;

const Template: ComponentStory<typeof TopNavigationBar> = (args) => (
    <TopNavigationBar
        currentPath={args.navigationLinks[0].path}
        navigationLinks={args.navigationLinks}
        user={args.user}
    />
);

export const Base = Template.bind({});

Base.args = {
    ...mockTopNavigationBarProps,
};
