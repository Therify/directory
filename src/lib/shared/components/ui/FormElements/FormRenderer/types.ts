import { FieldValues, Path } from 'react-hook-form';
import { SelectOption } from '../Select';

export type FormConfig<T extends FieldValues> = {
    sections: FormSection<T>[];
};

export type FormSection<T extends FieldValues> = {
    title?: string;
    fields: FormField<T>[];
};

export type FormField<T extends FieldValues> =
    | Input<T>
    | PasswordInput<T>
    | TextAreaInput<T>
    | SelectInput<T>;

interface FormFieldBase<T extends FieldValues> {
    id?: string;
    label: string;
    helperText?: string;
    fullWidth?: boolean;
    statePath: Path<T>;
    required?: boolean;
}
export type Input<T extends FieldValues> = {
    field: 'input';
    type?: 'text' | 'email' | 'number';
    placeholder?: string;
    autoComplete?: string;
} & FormFieldBase<T>;

export type PasswordInput<T extends FieldValues> = {
    field: 'password';
    placeholder?: string;
    allowShowPassword?: boolean;
} & FormFieldBase<T>;

export type TextAreaInput<T extends FieldValues> = {
    field: 'textarea';
    placeholder?: string;
} & FormFieldBase<T>;

export type SelectInput<T extends FieldValues> = {
    field: 'select';
    id: string;
    placeholder?: string;
    default?: string;
    options: string[] | SelectOption[];
    fullWidth?: boolean;
} & FormFieldBase<T>;
