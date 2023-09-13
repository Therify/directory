import { FieldValues, Path } from 'react-hook-form';
import { SelectOption } from '../Select';

export type FormConfig<T extends FieldValues> = {
    title: string;
    subtitle?: string;
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
    id: string;
    label: string;
    helperText?: string;
    fullWidth?: boolean;
    statePath: Path<T>;
    required?: boolean;
}
export type Input<T extends FieldValues> = {
    type: 'input';
    inputType?: 'text' | 'email' | 'number';
    placeholder?: string;
    autoComplete?: string;
} & FormFieldBase<T>;

export type PasswordInput<T extends FieldValues> = {
    type: 'password';
    placeholder?: string;
    allowShowPassword?: boolean;
} & FormFieldBase<T>;

export type TextAreaInput<T extends FieldValues> = {
    type: 'textarea';
    placeholder?: string;
} & FormFieldBase<T>;

export type SelectInput<T extends FieldValues> = {
    type: 'select';
    placeholder?: string;
    default?: string;
    options: string[] | SelectOption[];
    fullWidth?: boolean;
} & FormFieldBase<T>;