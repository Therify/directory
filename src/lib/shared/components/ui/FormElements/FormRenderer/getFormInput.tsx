import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { FormField } from './types';
import {
    InputField,
    PasswordField,
    TextAreaField,
    SelectField,
    TelephoneField,
    DatePickerField,
    ToggleField,
} from './ui';
import { RadioSelectField } from './ui/RadioSelectField';

interface GetFormInputProps<T extends FieldValues> {
    field: FormField<T>;
    useFormProps: UseFormReturn<T, any>;
    isLoading: boolean;
}

export function getFormInput<T extends FieldValues>({
    isLoading,
    field,
    useFormProps,
}: GetFormInputProps<T>): ReactNode {
    switch (field.type) {
        case 'input':
            return <InputField {...{ field, isLoading, ...useFormProps }} />;
        case 'password':
            return <PasswordField {...{ field, isLoading, ...useFormProps }} />;
        case 'textarea':
            return <TextAreaField {...{ field, isLoading, ...useFormProps }} />;
        case 'select':
            return <SelectField {...{ field, isLoading, ...useFormProps }} />;
        case 'telephone':
            return (
                <TelephoneField {...{ field, isLoading, ...useFormProps }} />
            );
        case 'date':
            return (
                <DatePickerField {...{ field, isLoading, ...useFormProps }} />
            );
        case 'toggle':
            return <ToggleField {...{ field, isLoading, ...useFormProps }} />;
        case 'radio':
            return <RadioSelectField {...{ field, isLoading, ...useFormProps }} />;
        default:
            return null;
    }
}
