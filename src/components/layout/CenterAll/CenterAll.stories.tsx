import { Meta } from '@storybook/react';
import { CenterAll } from './CenterAll';

const meta: Meta<typeof CenterAll> = {
    title: 'Layout/CenterAll',
    component: CenterAll,
};

export const Default = () => <CenterAll>test</CenterAll>;

export default meta;
