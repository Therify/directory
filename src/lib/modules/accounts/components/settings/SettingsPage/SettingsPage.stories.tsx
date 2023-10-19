import { TherifyUser } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import {
    SettingsPage as Component,
    SettingsTabId,
    SETTINGS_TAB_IDS,
} from './SettingsPage';

const meta: Meta<typeof Component> = {
    title: 'UI/SettingsPage',
    component: Component,
};

export default meta;

const user = {
    userId: '123',
    emailAddress: 'test@therify.co',
    givenName: 'Test',
    surname: 'User',
    roles: [Role.member],
    hasChatEnabled: false,
    createdAt: new Date().toISOString(),
} as TherifyUser.TherifyUser;

export const Default: StoryFn<typeof Component> = () => {
    const [currentTab, setCurrentTab] = useState<SettingsTabId>(
        SETTINGS_TAB_IDS.ACCOUNT
    );
    return (
        <Component
            user={user}
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            onUpdateUserDetails={console.log}
            onImageUploadSuccess={console.log}
            onImageUploadError={console.log}
            onRemoveDependent={console.log}
            dependents={[]}
            onUpdateInsuranceDetails={console.log}
            onCreateShareableLink={console.log}
        />
    );
};
