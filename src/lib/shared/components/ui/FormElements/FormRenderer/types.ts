import { FieldValues, Path, PathValue } from 'react-hook-form';
import { PhoneNumberFormat } from '../form-validation/phone';
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
    | SelectInput<T>
    | TelephoneInput<T>
    | DatePickerInput<T>
    | ToggleInput<T>
    | RadioSelectInput<T>;

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
    inputType: 'text' | 'number' | 'email' | 'tel';
    placeholder?: string;
    autoComplete?: string;
} & FormFieldBase<T>;

export type PasswordInput<T extends FieldValues> = {
    type: 'password';
    placeholder?: string;
    allowShowPassword?: boolean;
} & FormFieldBase<T>;

export type TelephoneInput<T extends FieldValues> = {
    type: 'telephone';
    placeholder?: string;
    format?: PhoneNumberFormat;
    autoComplete?: string;
    maskPlaceholderCharacter?: string;
} & FormFieldBase<T>;

export type TextAreaInput<T extends FieldValues> = {
    type: 'textarea';
    placeholder?: string;
} & FormFieldBase<T>;

export type SelectInput<T extends FieldValues> = {
    type: 'select';
    placeholder?: string;
    defaultValue?: PathValue<T, Path<T>>;
    options: string[] | SelectOption[];
} & FormFieldBase<T>;

export type RadioSelectInput<T extends FieldValues> = {
    type: 'radio';
    defaultValue?: PathValue<T, Path<T>>;
    options: string[] | SelectOption[];
} & FormFieldBase<T>;

export type DatePickerInput<T extends FieldValues> = {
    type: 'date';
    default?: string;
} & FormFieldBase<T>;

export type ToggleInput<T extends FieldValues> = {
    type: 'toggle';
    default?: boolean;
    toggleType?: 'checkbox' | 'switch' | 'radio';
} & FormFieldBase<T>;
