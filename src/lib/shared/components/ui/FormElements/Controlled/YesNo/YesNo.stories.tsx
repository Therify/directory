import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Meta, type StoryFn } from '@storybook/react';
import { YesNo as Component } from './YesNo';

const meta: Meta<typeof Component> = {
    title: 'FormElements/Controlled/YesNo',
    component: Component,
};

export default meta;

export const YesNo: StoryFn<typeof Component> = (args) => {
    const schema = z.object({
        isTherifyAwesome: z.boolean(),
        isMentalHealthAwarenessImportant: z.boolean().default(true),
    });
    const QUESTIONS = [
        {
            name: 'isTherifyAwesome',
            label: 'Is Therify awesome?',
            defaultValue: true,
        },
        {
            name: 'isMentalHealthAwarenessImportant',
            label: 'Is mental health awareness important?',
            defaultValue: true,
        },
    ];
    const {
        control,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            isMentalHealthAwarenessImportant: true,
            isTherifyAwesome: true,
        },
        resolver: zodResolver(schema),
    });
    watch(console.log);
    return (
        <>
            {QUESTIONS.map((question) => (
                <Component
                    key={question.name}
                    controllerProps={{
                        // @ts-ignore
                        name: question.name,
                        control,
                    }}
                    // @ts-ignore
                    error={errors[question.name]}
                    label={question.label}
                    defaultValue={question.defaultValue}
                />
            ))}
        </>
    );
};
