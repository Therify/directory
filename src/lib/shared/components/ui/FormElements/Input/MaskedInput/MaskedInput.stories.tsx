import { type Meta, type StoryFn } from '@storybook/react';
import { MaskedInput as Component } from './MaskedInput';
import { useState } from 'react';

const meta: Meta<typeof Component> = {
    title: 'UI/FormElements/MaskedInput',
    component: Component,
};

export default meta;

export const MaskedInput: StoryFn<typeof Component> = (args) => {
    const [value, setValue] = useState('12');
    return (
        <Component
            mask={'999-999-9999'}
            placeholder={'(123) 456-7890'}
            type="tel"
            label={'Phone Number'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};
