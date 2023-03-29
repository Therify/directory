import React from 'react';
import {
    useController,
    type FieldValues,
    type FieldError,
} from 'react-hook-form';
import type { Merge, UseControllerProps } from 'react-hook-form/dist/types';
import FormControlLabel, {
    type FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import Radio, { type RadioProps } from '@mui/material/Radio';
import { Paragraph } from '../../../Typography';

declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
    ? Props extends object
        ? Props
        : never
    : never;

export type MultipleChoiceProps<TForm extends FieldValues> = {
    label: string;
    type?: 'text' | 'number';
    labelProps?: $ElementProps<typeof Paragraph>;
    controllerProps: UseControllerProps<TForm>;
    error?: Merge<FieldError, (FieldError | undefined)[]>;
    choices: Array<
        {
            label: string;
            value: string | number;
        } & { controlLabelProps?: FormControlLabelProps }
    >;
} & RadioGroupProps;

export function ControlledMultipleChoice<TForm extends FieldValues>({
    controllerProps,
    error,
    type = 'text',
    label,
    labelProps = {},
    choices,
    defaultValue,
    defaultChecked,
    sx,
}: MultipleChoiceProps<TForm>) {
    const { field } = useController(controllerProps);
    return (
        <>
            <Paragraph {...labelProps}>{label}</Paragraph>
            <RadioGroup
                defaultValue={defaultValue}
                defaultChecked={defaultChecked}
                sx={sx}
                onChange={(e) => {
                    field.onChange(
                        type === 'number'
                            ? Number(e.target.value)
                            : e.target.value
                    );
                }}
            >
                {choices.map((choice) => (
                    <FormControlLabel
                        key={`${controllerProps.name}-${choice.value}`}
                        value={choice.value}
                        control={<Radio />}
                        label={choice.label}
                        sx={choice.controlLabelProps?.sx}
                    />
                ))}
            </RadioGroup>
        </>
    );
}
