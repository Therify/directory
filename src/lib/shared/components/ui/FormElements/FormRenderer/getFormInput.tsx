import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from './types';
import { InputField, PasswordField, TextAreaField, SelectField } from './ui';

interface GetFormInputProps<T extends FieldValues> {
    field: FormField<T>;
    useFormProps: UseFormReturn<T, any>;
}

export function getFormInput<T extends FieldValues>({
    field,
    useFormProps,
}: GetFormInputProps<T>): ReactNode {
    switch (field.type) {
        case 'input':
            return <InputField field={field} {...useFormProps} />;
        case 'password':
            return <PasswordField field={field} {...useFormProps} />;
        case 'textarea':
            return <TextAreaField field={field} {...useFormProps} />;
        case 'select':
            return <SelectField field={field} {...useFormProps} />;
        default:
            return null;
    }
}
