import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ControlledSelectGrid as Component } from './SelectGrid';
import { zodResolver } from '@hookform/resolvers/zod';

const meta: Meta<typeof Component> = {
    title: 'FormElements/Controlled/SelectGrid',
    component: Component,
};

export default meta;

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4'] as const;

const schema = z.object({
    options: z.enum(OPTIONS).array().min(1).max(2),
});

export const ControlledSelectGrid: StoryFn<typeof Component> = ({
    controllerProps,
    options = OPTIONS,
    ...rest
}) => {
    const {
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    watch(console.log);
    return (
        <Component
            {...rest}
            options={options}
            // @ts-ignore
            error={errors.options}
            label="SelectGrid"
            labelProps={{
                sx: {
                    mb: 4,
                    color: 'text.primary',
                },
            }}
            controllerProps={{
                control,
                name: 'options',
            }}
        />
    );
};
