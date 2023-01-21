import { SelectOption } from '@/components/ui/FormElements/Select';

export const asSelectOptions = <T extends string>(entries: readonly T[]) => {
    return entries.map((entry) => ({
        displayText: entry,
        value: entry,
    })) as SelectOption[];
};
