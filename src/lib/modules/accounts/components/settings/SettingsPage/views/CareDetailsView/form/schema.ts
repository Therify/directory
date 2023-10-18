import { InsuranceProvider } from '@/lib/shared/types';
import z from 'zod';

export const schema = z.object({
    insuranceProvider: z.enum(InsuranceProvider.ENTRIES),
});

export type Type = z.infer<typeof schema>;
