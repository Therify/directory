import { Path, PathValue, Validate } from 'react-hook-form';
import { SelectOption } from '../Select';

export type FormConfig<T> = {
    sections: FormSection<T>[];
};

export type FormSection<T> = {
    title?: string;
    fields: FormField<T>[];
};

export type FormField<T> =
    | Input<T>
    | PasswordInput<T>
    | TextAreaInput<T>
    | SelectInput<T>;

interface FormFieldBase<T> {
    id?: string;
    label: string;
    helperText?: string;
    fullWidth?: boolean;
    statePath: Path<T>;
    validation?: FormFieldValidation<T>;
    required?: boolean;
}
export type Input<T> = {
    field: 'input';
    type?: 'text' | 'email' | 'number';
    placeholder?: string;
    autoComplete?: string;
} & FormFieldBase<T>;

export type PasswordInput<T> = {
    field: 'password';
    placeholder?: string;
    allowShowPassword?: boolean;
    confirmationStatePath?: Path<T>;
} & FormFieldBase<T>;

export type TextAreaInput<T> = {
    field: 'textarea';
    placeholder?: string;
} & FormFieldBase<T>;

export type SelectInput<T> = {
    field: 'select';
    id: string;
    default?: string;
    options: string[] | SelectOption[];
    fullWidth?: boolean;
} & FormFieldBase<T>;

export type FormFieldValidation<T> = {
    required?: boolean | string;
    maxLength?: {
        value: number;
        message: string;
    };
    minLength?: {
        value: number;
        message: string;
    };
    max?: {
        value: number;
        message: string;
    };
    min?: {
        value: number;
        message: string;
    };
    // pattern?: {
    //     value: RegExp;
    //     message: string;
    // };
    validate?: Record<string, Validate<PathValue<T, Path<T>>, T>>;
};
