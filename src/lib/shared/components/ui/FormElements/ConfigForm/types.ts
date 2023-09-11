import { SelectOption } from '../Select';

export type FormConfig = {
    sections: FormSection[];
};

export type FormSection = {
    title?: string;
    fields: FormField[];
};

export type FormField = Input | PasswordInput | TextAreaInput | SelectInput;

interface FormFieldBase {
    id?: string;
    label: string;
    helperText?: string;
    fullWidth?: boolean;
    statePath: string;
    required?: boolean;
}
export type Input = {
    field: 'input';
    type?: 'text' | 'email' | 'number';
    placeholder?: string;
    autoComplete?: string;
} & FormFieldBase;

export type PasswordInput = {
    field: 'password';
    placeholder?: string;
    allowShowPassword?: boolean;
} & FormFieldBase;

export type TextAreaInput = {
    field: 'textarea';
    placeholder?: string;
} & FormFieldBase;

export type SelectInput = {
    field: 'select';
    id: string;
    default?: string;
    options: string[] | SelectOption[];
    fullWidth?: boolean;
} & FormFieldBase;
