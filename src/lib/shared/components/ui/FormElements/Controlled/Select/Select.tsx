import { asSelectOptions } from '@/lib/shared/utils';
import { DeepPartial } from '@auth0/nextjs-auth0/dist/auth0-session';
import {
    type FieldValues,
    type FieldError,
    useController,
} from 'react-hook-form';
import {
    type UseControllerProps,
    type Merge,
} from 'react-hook-form/dist/types';
import { Select } from '../../Select';

declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
    ? Props extends object
        ? Props
        : never
    : never;

type ControlledSelectProps<TForm extends FieldValues> = {
    controllerProps: UseControllerProps<TForm>;
    options: string[];
    label: string;
    errors?: Merge<FieldError, (FieldError | undefined)[]>;
    selectProps?: Omit<$ElementProps<typeof Select>, 'id' | 'options'>;
    defaultValues?: DeepPartial<TForm>;
};

export function ControlledSelect<TForm extends FieldValues>({
    controllerProps,
    options,
    label,
    errors,
    selectProps,
}: ControlledSelectProps<TForm>) {
    const { field } = useController(controllerProps);
    return (
        <>
            <Select
                id={controllerProps.name}
                label={label}
                options={asSelectOptions(options)}
                {...field}
                {...selectProps}
            />
        </>
    );
}
