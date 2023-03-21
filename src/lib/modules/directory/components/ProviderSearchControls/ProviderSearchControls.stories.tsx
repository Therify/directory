import { UNITED_STATES } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';
import { Meta, StoryObj } from '@storybook/react';
import { FilterOption, ProviderSearchControls } from './ProviderSearchControls';

const filters: FilterOption[] = [
    {
        name: 'State',
        options: asSelectOptions(UNITED_STATES.STATE.ENTRIES),
    },
];
const meta: Meta<typeof ProviderSearchControls> = {
    title: 'Features/Directory/ProviderSearchControls',
    component: ProviderSearchControls,
    args: {
        primaryFilters: filters,
    },
};

export default meta;

export const Default: StoryObj<typeof ProviderSearchControls> = {};
