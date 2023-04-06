import { z } from 'zod';
import { type Meta, type StoryFn } from '@storybook/react';
import { DealBreaker as Component } from './DealBreaker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const meta: Meta<typeof Component> = {
    title: 'FormElements/Controlled/DealBreaker',
    component: Component,
};

export default meta;

export const DealBreaker: StoryFn<typeof Component> = () => {
    const selectOptions = ['Red', 'Green', 'Blue', "Don't care"];
    const schema = z.object({
        color: z.string().optional().default('Red'),
        isColorDealBreaker: z.boolean().optional().default(false),
    });
    const {
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            color: 'Red',
            isColorDealBreaker: false,
        },
        resolver: zodResolver(schema),
    });
    watch(console.log);
    return (
        <Component
            label="Color"
            predicateFn={(value) => value !== "Don't care"}
            controllerProps={{
                name: 'color',
                control,
            }}
            options={selectOptions}
            dealBreakerName="isColorDealBreaker"
        />
    );
};
