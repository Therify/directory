import { asSelectOptions } from '@/lib/shared/utils';
import { Stack } from '@mui/material';
import React from 'react';
import {
    type FieldValues,
    type FieldError,
    useController,
} from 'react-hook-form';
import {
    type UseControllerProps,
    type Merge,
    type DeepPartial,
    Path,
} from 'react-hook-form/dist/types';
import { Select } from '../../Select';
import { YesNo } from '../YesNo';

declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
    ? Props extends object
        ? Props
        : never
    : never;

export type DealBreakerProps<
    TForm extends FieldValues,
    options extends string[]
> = {
    controllerProps: UseControllerProps<TForm>;
    selectProps?: Omit<$ElementProps<typeof Select>, 'id' | 'options'>;
    errors?: Merge<FieldError, (FieldError | undefined)[]>;
    defaultValues?: DeepPartial<TForm>;
    dealBreakerName: Path<TForm>;
    options: options;
    label: string;
    predicateFn: (value: string) => boolean;
};

export function DealBreaker<
    TForm extends FieldValues,
    options extends string[]
>({
    controllerProps,
    selectProps,
    options,
    dealBreakerName,
    label,
    predicateFn,
}: DealBreakerProps<TForm, options>) {
    const { field } = useController(controllerProps);
    const onItemSelected = (value: string) => {
        field.onChange(value);
    };
    return (
        <Stack>
            <Select
                id={controllerProps.name}
                label={label}
                onChange={onItemSelected}
                value={field.value}
                options={asSelectOptions(options)}
                {...selectProps}
            />
            {predicateFn(field.value) && (
                <YesNo
                    label="Is this preference mandatory?"
                    labelProps={{
                        sx: {
                            background: 'cornsilk',
                            padding: '0.5rem',
                        },
                    }}
                    controllerProps={{
                        name: dealBreakerName,
                        control: controllerProps.control,
                    }}
                />
            )}
        </Stack>
    );
}
