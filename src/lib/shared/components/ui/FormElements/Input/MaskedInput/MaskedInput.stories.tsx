import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Meta, type StoryFn } from '@storybook/react';
import { MaskedInput as Component } from './MaskedInput';

const meta: Meta<typeof Component> = {
    title: 'UI/FormElements/MaskedInput',
    component: Component,
};

export default meta;

export const MaskedInput: StoryFn<typeof Component> = (args) => {
    return (
        <Component
            mask={'(999) 999-9999'}
            placeholder={'(123) 456-7890'}
            type="tel"
            label={'Phone Number'}
        />
    );
};
