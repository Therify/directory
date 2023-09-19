import { FieldValues } from 'react-hook-form';
import { FormConfig, FormField } from '../types';

export function getMockInputConfig<T extends FieldValues>(
    field: FormField<T>
): FormConfig<T> {
    return {
        title: 'title',
        sections: [
            {
                title: 'Section 1',
                fields: [field],
            },
        ],
    };
}
