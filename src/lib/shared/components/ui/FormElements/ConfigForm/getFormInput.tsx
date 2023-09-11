import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from './types';
import { InputField, PasswordField, TextAreaField, SelectField } from './ui';

interface GetFormInputProps<FormSchema extends z.ZodTypeAny> {
    field: FormField;
    useFormProps: UseFormReturn<FormSchema, any>;
}

export function getFormInput<FormSchema extends z.ZodType, T>({
    field,
    useFormProps,
}: GetFormInputProps<FormSchema>): ReactNode {
    switch (field.field) {
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
