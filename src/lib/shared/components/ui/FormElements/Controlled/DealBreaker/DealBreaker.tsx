import { asSelectOptions } from '@/lib/shared/utils';
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
    errors?: Merge<FieldError, (FieldError | undefined)[]>;
    defaultValues?: DeepPartial<TForm>;
    dealBreakerName: Path<TForm>;
    options: string[];
    label: string;
    predicateFn: (value: string) => boolean;
};

export function DealBreaker<
    TForm extends FieldValues,
    options extends string[]
>({
    controllerProps,
    errors,
    defaultValues,
    options,
    dealBreakerName,
    label,
    predicateFn,
}: DealBreakerProps<TForm, options>) {
    const { field } = useController(controllerProps);
    const [selectedItem, setSelectedItem] = React.useState<string>(options[0]);
    const onItemSelected = (value: string) => {
        setSelectedItem(value);
        field.onChange(value);
    };
    return (
        <>
            <Select
                id={controllerProps.name}
                label={label}
                onChange={onItemSelected}
                value={selectedItem}
                options={asSelectOptions(options)}
            />
            {predicateFn(selectedItem) && (
                <YesNo
                    label="Deal Breaker"
                    controllerProps={{
                        name: dealBreakerName,
                        control: controllerProps.control,
                    }}
                />
            )}
        </>
    );
}
